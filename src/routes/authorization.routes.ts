import { Router,Request,Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

import authConfig from '../config/auth';

import GetTokenService from '../services/GetTokenService';
import AppError from '../AppError';

interface express{
  request: Request,
  response:Response,
}

const routes = Router();

routes.get('/',async (request,response)=>{
  try {
    
    const {scopePlayingCurrengSong,clientId,urlCode } = authConfig
   
    response.redirect( urlCode +
    '?response_type=code'+
    '&client_id='+clientId+
    '&scope='+encodeURIComponent(scopePlayingCurrengSong)+
    '&redirect_uri='+encodeURIComponent(`${process.env.APP_URL}authorization/token`))
  } catch (error) {
    throw new AppError(error.message,error.code);
  }

});
routes.get('/token',async (request,response)=>{
  try {
    const getTokenService =  new GetTokenService();
    
    const authorizedCode  = await request.query.code
    const {access_token,refresh_token,token_type,expires_in} = await getTokenService.execute(authorizedCode as string,`${process.env.APP_URL}authorization/token`);

    request.token = {accessToken:access_token,refreshToken:refresh_token}  
      
    return response.json({access_token,refresh_token,token_type,expires_in});
  } catch (error) {
    throw new AppError(error.message,error.code);
  }  
})

export default routes;