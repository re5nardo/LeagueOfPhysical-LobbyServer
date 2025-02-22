import { UserLocation } from '@interfaces/user-location.interface';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserLocationDaoMongoose } from '@daos/user-location.dao.mongoose';
import { UserLocationDaoRedis } from '@daos/user-location.dao.redis';

export class UserLocationRepository extends CacheCrudRepository<UserLocation> {
    constructor() {
        super(new UserLocationDaoMongoose(), new UserLocationDaoRedis());
    }
}
