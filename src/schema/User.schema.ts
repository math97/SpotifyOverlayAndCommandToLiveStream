import {Schema} from 'mongoose';

const UserSchema = new Schema({
  email:  String, // String is shorthand for {type: String}
  password: String,
  accessToken: String,
  refreshToken: String,
});

export default UserSchema;