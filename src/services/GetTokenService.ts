import axios, { AxiosRequestConfig } from 'axios';
import authConfig from '../config/auth';

interface DataGetTokenResponse {
  access_token: string ;
  token_type : string ;
  scope: string ;
  expires_in: number ;
  refresh_token: string ;
}

class GetToken {
  public async execute(authorizedCode:string,redirectUri:string):Promise<DataGetTokenResponse>{

    const {clientId,clientSecret,urlToken} = authConfig;
    
    const config:AxiosRequestConfig = {
      method:'post',
      url:urlToken,
      headers:{
        Authorization:'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      params:{
      code:authorizedCode,
      redirect_uri:redirectUri,
      grant_type:'authorization_code',
      }
    } 

      const dataResponse = await axios(config);

      const { access_token,token_type,scope,expires_in,refresh_token } = dataResponse.data;

      return {access_token,token_type,scope,expires_in, refresh_token}

  }
}

export default GetToken;