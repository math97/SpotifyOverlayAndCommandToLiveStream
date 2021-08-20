import { request, Router } from "express";
import mongoose,{ model } from 'mongoose';

import UserController from '../controllers/userController';

const userRoutes = Router();

interface UserData{
  email:string,
  password:string,
  accessToken: string,
  refreshToken: string,
}

userRoutes.post('/', async (request,response)=>{

  const {saveUser} = new UserController();
  
  const {email,password,accessToken,refreshToken}:UserData = request.body;
  const user = await saveUser({email,password,accessToken,refreshToken})
    
  return response.json(user);
});

userRoutes.get('/', async (request,response)=>{
  try {  
    const {id} = request.body;

    const userModel = model('User',UserSchema);
    const user = await userModel.findById(id);

    return response.json({user});
    
  } catch (error) {
    console.log(error); 
  }
});

export default userRoutes;