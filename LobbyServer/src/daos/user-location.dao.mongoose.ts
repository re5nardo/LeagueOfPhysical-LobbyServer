import { UserLocation } from '@interfaces/user-location.interface';
import userLocationModel from '@models/user-location.model';
import { DaoMongooseBase } from '@daos/dao.mongoose.base';
import { Model } from 'mongoose';

export class UserLocationDaoMongoose extends DaoMongooseBase<UserLocation> {
    get mongooseModel(): Model<UserLocation> {
        return userLocationModel as Model<UserLocation>;
    }
}
