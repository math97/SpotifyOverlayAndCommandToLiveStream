import { request, Router } from "express";
import mongoose,{ model } from 'mongoose';

import UserSchema from '../schema/User.schema';

const userRoutes = Router();

interface UserData{
  email:string,
  password:string,
  accessToken: string,
  refreshToken: string,
}

userRoutes.post('/', async (request,response)=>{
  try {  
    const {email,password,accessToken,refreshToken}:UserData = request.body;
      const userModel = model('User',UserSchema);
    
      const user = new userModel({email,password,accessToken,refreshToken});
          
      await user.save()
    
      response.json({user});
    
  } catch (error) {
    console.log(error); 
  }
});

userRoutes.get('/', async (request,response)=>{
  try {  
    const {id} = request.body;

    const userModel = model('User',UserSchema);
    const user = userModel.findById(id);

    return response.json({user});
    
  } catch (error) {
    console.log(error); 
  }
});

export default userRoutes;