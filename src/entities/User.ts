import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity('User')
class User{

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  constructor(email:string,password:string,accessToken:string,refreshToken:string){
    this.email = email;
    this.password = password;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

}

export default User;