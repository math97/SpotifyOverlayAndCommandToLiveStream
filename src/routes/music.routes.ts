import { Router,Request,Response } from 'express';

import MusicController from '../controllers/musicController';
import AppError from '../AppError';

const musicRoutes = Router();

musicRoutes.get('/',async (request,response)=>{  
  try {
    const {accessToken} =  request.query;
    
    if(!accessToken || accessToken === undefined) throw new AppError('User not authenticated.Send the correct token',401);
  
    const musicController = new MusicController();
    const data = await musicController.getCurrentPlayingTrack(accessToken as string); 
    
    return response.json(data);
  } catch (error) {    
    if(error.statusCode === 401) return response.json({Error:"Token not sent or invalid"});
    throw new AppError(error.message,error.urlCode);
  }
});

export default musicRoutes;
