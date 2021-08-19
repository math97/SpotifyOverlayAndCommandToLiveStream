import { Router,Request,Response } from 'express';

import PlaylistController from '../controllers/playlistController';
import AppError from '../AppError';

const playlistRoutes = Router();

playlistRoutes.get('/',async (request,response)=>{  
  try {
    const {accessToken} =  request.query;
    
    if(!accessToken || accessToken === undefined) throw new AppError('User not authenticated.Send the correct token',401);
  
    const playlistController = new PlaylistController();
    const data = await playlistController.getCurrentPlaylist(accessToken as string); 
    
    return response.status(200).send(data);
  } catch (error) {
    if(error.statusCode === 401) return response.json({Error:"Token not sent or invalid"});
    throw new AppError(error.message,error.urlCode);
  }
});

export default playlistRoutes;