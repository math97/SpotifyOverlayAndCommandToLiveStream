import { Request, Response, Router } from 'express';

import authorizationRoutes from './authorization.routes';

import GetCurrentPlayingTrackService from '../services/GetCurrentPlayingTrackService';
import saveTokensMiddleware from '../middlewares/saveTokens';

const routes = Router();

routes.use('/authorization',authorizationRoutes);
//routes.use(saveTokensMiddleware);
routes.get('/currentPlayingTrack',async (request,response)=>{
  
  const {accessToken} =  request.query;

  const getCurrentPlayingTrackService = new GetCurrentPlayingTrackService();
  
  try {
    const data = await getCurrentPlayingTrackService.execute(accessToken as string); 

    return response.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default routes;
