import { model, Schema, Document } from 'mongoose';
import { Room, MatchType } from '@interfaces/room.interface';

const matchSettingSchema = new Schema({
    matchType: {
        type: String,
        enum: MatchType,
    },
    subGameId: String,
    mapId: String,
});

const roomSchema: Schema = new Schema({
    matchId: String,
    expectedPlayerList: [String],
    matchSetting: matchSettingSchema,
    ip: String,
    port: Number,
});

const roomModel = model<Room & Document>('Room', roomSchema);

export default roomModel;
