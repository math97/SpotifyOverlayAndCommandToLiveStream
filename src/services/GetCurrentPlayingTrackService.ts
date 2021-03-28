import axios from "axios";

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
      
      const {name, artists} = dataResponseSpotify.data.item;
      
      const artistResponse = artists.map((artist)=>{
        return artist.name;
      })      
      return {name,artistResponse};
      
      
    } catch (error) {
      console.log(error);
    }

  }

}

export default GetCurrentPlayingTrack;