import axios from "axios";
import AppError from "../AppError";

class GetCurrentPlaylist {
  public async execute(accessToken:string){    
    try {
      const dataResponseSpotify = await axios.get('https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers:{
        'Authorization':`Bearer ${accessToken}`
      },
      params:{
        market:'BR'
      }
      });

      if(!dataResponseSpotify.data || dataResponseSpotify.data === null || dataResponseSpotify.data.lenght === 0) return {message:"User is not listening to any music"};
            
      return dataResponseSpotify.data.context.external_urls.spotify;
      
    } catch (error) {
      throw new AppError(error.message,error.code);    }
  }
}

export default GetCurrentPlaylist;