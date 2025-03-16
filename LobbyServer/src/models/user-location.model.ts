import { model, Schema, Document } from 'mongoose';
import { UserLocation, Location } from '@interfaces/user-location.interface';

const userLocationSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: Number,
        enum: Location,
    },
    locationDetail: Schema.Types.Mixed,
    timestamp: Date,
});

const userLocationModel = model<UserLocation & Document>('UserLocation', userLocationSchema);

export default userLocationModel;
