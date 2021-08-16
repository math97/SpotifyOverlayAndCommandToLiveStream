import GetCurrentPlayingTrackService from '../services/GetCurrentPlayingTrackService';
import AppError from "../AppError";

interface artistData{
  name: string;
}

export default class PlaylistController { 
  public async getCurrentPlaylist(accessToken:string){
    try {

      const getCurrentPlayingTrackService = new GetCurrentPlayingTrackService();
      const dataResponseSpotify = await getCurrentPlayingTrackService.execute(accessToken as string); 
  
      const context = dataResponseSpotify.data.context;

      console.log(context,'-----context');
    
      if(context === null) return 'this song doesn\'t belong to any playlist';

      return context.external_urls.spotify;
      
    } catch (error) {
      console.log(error,'----------- controller');
      
      throw new AppError(error.message,error.code);    
    }
  }
}