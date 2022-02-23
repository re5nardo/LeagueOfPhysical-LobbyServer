import { model, Schema, Document } from 'mongoose';
import { UserMatch } from '@interfaces/user.match.interface';

const userMatchSchema: Schema = new Schema({
  state: {
    type: String,
    default: '',
  },
  stateValue: {
    type: String,
    default: '',
  },
  matchmakingTicketId: {
    type: String,
    default: '',
  },
});

const userMatchModel = model<UserMatch & Document>('UserMatch', userMatchSchema);

export default userMatchModel;
