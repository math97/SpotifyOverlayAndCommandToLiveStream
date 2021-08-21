import { request, Router } from "express";
import AppError from "../AppError";

import UserController from '../controllers/userController';

const userRoutes = Router();

interface UserData{
  email:string,
  password:string,
  accessToken: string,
  refreshToken: string,
}
const {saveUser,getUser} = new UserController();


userRoutes.post('/', async (request,response)=>{
try{  const {email,password,accessToken,refreshToken}:UserData = request.body;
  const user = await saveUser({email,password,accessToken,refreshToken})
    
  return response.json(user);
}catch(e){
  console.log(e);
}
});

userRoutes.get('/', async (request,response)=>{
  try {
    const id = request.query.id;
    
    if(!id) throw new AppError('Id invalid',400)
    const user = await getUser(id as string);
    return response.json(user);
  } catch (error) {
    if(error.statusCode ===400) return response.status(400).json(error.message);
    console.log(error); 
  }
});

export default userRoutes;