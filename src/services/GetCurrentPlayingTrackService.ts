import axios from "axios";
import AppError from "../AppError";

interface artistData{
    name: string;
}

class GetCurrentPlayingTrack {
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
      
      const {name, artists} = dataResponseSpotify.data.item;
      
      const artistResponse = artists.map((artist:artistData)=>{
        return artist.name;
      })

      return `${name} - by:${artistResponse}`;  
      
    } catch (error) {
      throw new AppError(error.message,error.code);    }
  }
}

export default GetCurrentPlayingTrack;