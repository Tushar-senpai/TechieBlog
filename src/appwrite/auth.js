import conf from "../conf/conf";
import {Client, Account, ID} from 'appwrite'
const baseLink = import.meta.env.VITE_APPWRITE_URL;

export class AuthService{
    client = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
          const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if(userAccount) {
                //call another method
                return this.login({email, password});
                
            }            
            else{
                return userAccount;
            }
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