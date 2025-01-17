import conf from "../conf/conf";
import {Client, Account, ID} from 'appwrite'
const baseLink = import.meta.env.VITE_BASE_LINK;


export class AuthService{
    client = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async updateVerification({id, secret}) {
        try {
            return await this.account.updateVerification(id, secret);
        } catch (error) {
            throw error;
        }
    }


    async createSession({email, password}){
        try{
            console.log(password, email)
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log(session);
            return session;
        }catch(error){
            throw error;
        }
    }

    async createVerification(){
        try{
            const link = await this.account.createVerification(`${baseLink}/verify-email`)
            return link;
        }catch(error){
            throw error;
        }
    }

    async createAccount({email, password, name}) {
        try {
            // Create the account
            
            const userAccount = await this.account.create(ID.unique(),  email, password, name);
            console.log(userAccount)
            // Create a temporary session to send verification email
            const session  = await this.account.createEmailPasswordSession(email, password);
            console.log(session);

            // Now create verification linkbefore verify-email
            await this.account.createVerification(`${baseLink}/verify-email`);
            // Delete the session after sending verification email
            const del =             await this.account.deleteSessions();
            console.log(del);
            
            return userAccount;
        } catch (error) {
            try {
                await this.account.deleteSessions();
            } catch (sessionError) {
                console.log("Error cleaning up session:", sessionError);
            }
            throw error;
        }
    }

    async login({email, password}) {
        try {
            // First create session
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log(session);
            // Get user details
            const user = await this.account.get();
            console.log(user);

            // Check if email is verified
            if (!user.emailVerification) {
                // Delete the session since email isn't verified
                await this.account.deleteSessions();
                throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
            }
            
            return user;
        } catch (error) {
            // Clean up any session if there was an error
            try {
                await this.account.deleteSessions();
            } catch (sessionError) {
                console.log("Error cleaning up session:", sessionError);
            }

            if (error.code === 401) {
                throw new Error('Invalid email or password');
            }
            throw error;
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    // New methods for password reset functionality
    async resetPassword(email) {
        try {
            const response = await this.account.createRecovery(
                email,
                `${window.location.origin}/reset-password`  // This URL should match your reset password route
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: resetPassword :: error", error);
            throw error;
        }
    }

    async completeReset(userId, secret, newPassword, confirmPassword) {
        try {
            const response = await this.account.updateRecovery(
                userId,
                secret,
                newPassword,
                confirmPassword
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: completeReset :: error", error);
            throw error;
        }
    }
    
    async changePassword(oldPassword, newPassword) {
        try {
            return this.account.updatePassword(
                newPassword, 
                oldPassword
            );
        } catch (error) {
            console.log("Appwrite service :: changePassword :: error", error);
            throw error;
            
        }
    }
}

const authService = new AuthService();

export default authService;