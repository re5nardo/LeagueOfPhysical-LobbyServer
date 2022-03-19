import { model, Schema, Document } from 'mongoose';
import { Room, MatchType } from '@interfaces/room.interface';

const matchSettingSchema = new Schema({
    matchType: {
        type: String,
        enum: MatchType,
    },
    subGameId: {
        type: String,
    },
    mapId: {
        type: String,
    },
});

const roomSchema: Schema = new Schema({
    matchId: {
        type: String,
    },
    expectedPlayerList: {
        type: [String],
    },
    matchSetting: {
        type: matchSettingSchema,
    },
    ip: {
        type: String,
    },
    port: {
        type: Number,
    },
});

const roomModel = model<Room & Document>('Room', roomSchema);

export default roomModel;
