import { Request, Response, Router } from 'express';

import authorizationRoutes from './authorization.routes';

import GetCurrentPlayingTrackService from '../services/GetCurrentPlayingTrackService';
import GetCurrentPlaylist from '../services/GetCurrentPlaylist';
import saveTokensMiddleware from '../middlewares/saveTokens';
import AppError from '../AppError';

const routes = Router();

routes.get('/',(request,response)=>{
  response.json({status:'working'})
})

routes.use('/authorization',authorizationRoutes);
//routes.use(saveTokensMiddleware);
routes.get('/currentPlayingTrack',async (request,response)=>{  
  try {
    const {accessToken} =  request.query;
    
    if(!accessToken || accessToken === undefined) throw new AppError('User not authenticated.Send the correct token',401);
  
    const getCurrentPlayingTrackService = new GetCurrentPlayingTrackService();
    const data = await getCurrentPlayingTrackService.execute(accessToken as string); 

    return response.json(data);
  } catch (error) {
    if(error.statusCode === 401) return response.json({Error:"Token not sent or invalid"});
    throw new AppError(error.message,error.urlCode);
  }
});

routes.get('/currentPlaylist',async (request,response)=>{  
  try {
    const {accessToken} =  request.query;
    
    if(!accessToken || accessToken === undefined) throw new AppError('User not authenticated.Send the correct token',401);
  
    const getCurrentPlayingTrackService = new GetCurrentPlaylist();
    const data = await getCurrentPlayingTrackService.execute(accessToken as string); 

    console.log(JSON.stringify(data));
    
    return response.json(` ${data} `)
  } catch (error) {
    if(error.statusCode === 401) return response.json({Error:"Token not sent or invalid"});
    throw new AppError(error.message,error.urlCode);
  }
});

export default routes;
