import mongoose,{ model } from 'mongoose';

import AppError from "../AppError";
import UserSchema from '../schema/User.schema';

interface UserData{
  email:string,
  password:string,
  accessToken: string,
  refreshToken: string,
}

export default class UserController { 
  public async saveUser(userData:UserData){
    try {
      const userModel = model('User',UserSchema);
      const user = new userModel({
        email:userData.email,
        password:userData.password,
        accessToken:userData.accessToken,
        refreshToken:userData.refreshToken
      });
      return await user.save()
    } catch (error) {      
      throw new AppError(error.message,error.code);    
    }
  }
}