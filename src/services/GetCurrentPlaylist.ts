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

      if(!dataResponseSpotify.data || dataResponseSpotify.data === null || dataResponseSpotify.data.lenght === 0) return "User is not listening to any music";

      const data = dataResponseSpotify.data;
            
      return data.context.external_urls.spotify?data.context.external_urls.spotify : 'this song doesn\'t belong to any playlist';

    } catch (error) {
      console.log(error);
      throw new AppError(error.message,error.code); 
    }
  }
}

export default GetCurrentPlaylist;