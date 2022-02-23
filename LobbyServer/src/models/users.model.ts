import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  // userId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  nickname: {
    type: String,
    default: '',
  },
  masterExp: {
    type: Number,
    default: 0,
  },
  friendlyRating: {
    type: Number,
    default: 1500,
  },
  rankRating: {
    type: Number,
    default: 1500,
  },
  goldCoin: {
    type: Number,
    default: 100,
  },
  gem: {
    type: Number,
    default: 10,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
