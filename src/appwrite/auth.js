import conf from "../conf/conf";
import {Client, Account, ID} from 'appwrite'
const baseLink = 'http://localhost:5173/'


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
            // Create a temporary anonymous session for verification
            const anonymous = await this.account.createAnonymousSession();
            
            // Update verification
            const verify = await this.account.updateVerification(id, secret);
            
            // Cleanup anonymous session
            await this.account.deleteSession('current');
            
            return verify;
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
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            // Create a temporary session to handle verification
            const session = await this.account.createEmailPasswordSession(email, password);
            
            // Create verification link with active session
            const verificationLink = await this.account.createVerification(`${baseLink}verify-email`);
            
            // Delete the temporary session
            await this.account.deleteSession('current');
            
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            // First check if the user is verified
            const session = await this.account.createEmailPasswordSession(email, password);
            const user = await this.account.get();
            
            if (!user.emailVerification) {
                await this.account.deleteSessions(); // Logout if not verified
                throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
            }
            
            return session;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
          return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
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