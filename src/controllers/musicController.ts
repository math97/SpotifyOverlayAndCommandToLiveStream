import GetCurrentPlayingTrackService from '../services/GetCurrentPlayingTrackService';
import AppError from "../AppError";

interface artistData{
  name: string;
}

export default class MusicController { 
  public async getCurrentPlayingTrack(accessToken:string){
    try {

      const getCurrentPlayingTrackService = new GetCurrentPlayingTrackService();
      const dataResponseSpotify = await getCurrentPlayingTrackService.execute(accessToken as string); 

      console.log(dataResponseSpotify,'data --------');
      
  
      const {name, artists} = dataResponseSpotify.item;
      
      const artistResponse = artists.map((artist:artistData)=>{
        return artist.name;
      })

      return `${name} - by:${artistResponse}`;  
      
    } catch (error) {      
      throw new AppError(error.message,error.code);    
    }
  }
}