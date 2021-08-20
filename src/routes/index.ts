import { Request, Response, Router } from 'express';

import authorizationRoutes from './authorization.routes';
import musicRoutes from './music.routes';
import playlistRoutes from './playlist.routes';
import userRoutes from './user.routes';

import saveTokensMiddleware from '../middlewares/saveTokens';

const routes = Router();

routes.get('/',(request,response)=>{
  response.json({status:'working'})
})

routes.use('/authorization',authorizationRoutes);
routes.use('/currentPlayingTrack',musicRoutes);
routes.use('/currentPlaylist',playlistRoutes);
routes.use('/user',userRoutes);
//routes.use(saveTokensMiddleware);


export default routes;
