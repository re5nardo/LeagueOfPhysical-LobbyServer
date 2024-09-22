import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/user.interface';

const userSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: String,
    masterExp: Number,
    friendlyRating: Number,
    rankRating: Number,
    goldCoin: Number,
    gem: Number,
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
