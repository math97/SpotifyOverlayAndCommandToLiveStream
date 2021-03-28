import {Request,Response,NextFunction } from 'express';

interface express{
  request: Request,
  response:Response,
  next:NextFunction,
}

export default function saveTokens({request,response,next}:express):void{
  console.log(request);
  //Was a middleware to take the tokens and using in request.
  //After developing the front end I will create some cookie and retrieve the data here
  next();
  
}