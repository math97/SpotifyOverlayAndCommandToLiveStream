import { Router,Request,Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

import authConfig from '../config/auth';

import GetTokenService from '../services/GetTokenService';

interface express{
  request: Request,
  response:Response,
}

const routes = Router();

routes.get('/',async (request,response)=>{
  const {scopePlayingCurrengSong,clientId,urlCode } = authConfig
 
  response.redirect( urlCode +
  '?response_type=code'+
  '&client_id='+clientId+
  '&scope='+encodeURIComponent(scopePlayingCurrengSong)+
  '&redirect_uri='+encodeURIComponent('https://be37fd69b3c8.ngrok.io/authorization/token'))

});
routes.get('/token',async (request,response)=>{

  const getTokenService =  new GetTokenService();
  
  const authorizedCode  = await request.query.code

  try {
    const {access_token,refresh_token,token_type,expires_in} = await getTokenService.execute(authorizedCode as string,'https://be37fd69b3c8.ngrok.io/authorization/token');

    request.token = {accessToken:access_token,refreshToken:refresh_token}  
      
    return response.json({access_token,refresh_token,token_type,expires_in});
  } catch (error) {
    console.log(error);
  }  
})

export default routes;