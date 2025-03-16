import { UserLocation } from '@interfaces/user-location.interface';
import { UserLocation as UserLocationEntity } from '@prisma/client';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserLocationDaoPostgres } from '@daos/user-location.dao.postgres';
import { UserLocationDaoRedis } from '@daos/user-location.dao.redis';
import { UserLocationMapper } from '@mappers/entities/user.location.mapper'

export class UserLocationRepository extends CacheCrudRepository<UserLocation, UserLocationEntity> {
    constructor() {
        super(new UserLocationDaoPostgres(), new UserLocationDaoRedis(), new UserLocationMapper());
    }
}
