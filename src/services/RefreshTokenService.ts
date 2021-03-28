import axios, { AxiosRequestConfig } from 'axios';
import authConfig from '../config/auth';

interface DataRefreshTokenResponse {
  acess_token:string ;
  token_type : string ;
  scope:string ;
  expires_in: number
}

class RefreshToken {
  public async execute(refreshToken:string){

    const {clientId,clientSecret,urlToken} = authConfig;
    

    const config:AxiosRequestConfig = {
      method:'post',
      url:urlToken,
      headers:{
        Authorization:'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      params:{
        refresh_token:refreshToken,
        grant_type:'refresh_token',
      }
    } 

    try {
      
      const dataResponse = await axios(config);
  
      const { acess_token,token_type,scope,expires_in }:DataRefreshTokenResponse = dataResponse.data;

      return {acess_token,token_type,scope,expires_in}
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default RefreshToken ;