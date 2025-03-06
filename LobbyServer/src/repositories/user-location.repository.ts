import { UserLocation } from '@interfaces/user-location.interface';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserLocationDaoPostgres } from '@daos/user-location.dao.postgres';
import { UserLocationDaoRedis } from '@daos/user-location.dao.redis';

export class UserLocationRepository extends CacheCrudRepository<UserLocation> {
    constructor() {
        super(new UserLocationDaoPostgres(), new UserLocationDaoRedis());
    }
}
