import { request, Router } from "express";
import { getMongoManager } from "typeorm";
import User from "../entities/User";


const userRoutes = Router();

interface UserData{
  email:string,
  password:string,
  accessToken: string,
  refreshToken: string,
}

userRoutes.post('/', async (request,response)=>{
  console.log('chegou');

  const {email,password,accessToken,refreshToken}:UserData = request.body;

  const id = "teste"

  const user =  new User(email,password,accessToken,refreshToken);

  const manager = getMongoManager();
  await manager.save(user);

  response.json({user});
  
})


export default userRoutes;