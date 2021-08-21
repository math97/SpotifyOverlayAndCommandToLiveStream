import { model } from 'mongoose';

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
        accessToken:null,
        refreshToken:null,
      });
      return await user.save()
    } catch (error) {      
      throw new AppError(error.message,error.code);    
    }
  }

  public async getUser(id:String){
    try {
      const userModel = model('User',UserSchema);
      return await userModel.findById(id);
    } catch (error) {      
      throw new AppError(error.message,error.code);    
    }
  }
}