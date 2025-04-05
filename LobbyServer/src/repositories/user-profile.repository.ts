import { UserProfile } from '@interfaces/user-profile.interface';
import { UserProfile as UserProfileEntity } from '@prisma/client';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserProfileDaoPostgres } from '@daos/user-profile.dao.postgres';
import { UserProfileDaoRedis } from '@daos/user-profile.dao.redis';
import { UserProfileMapper } from '@mappers/entities/user-profile.mapper';

export class UserProfileRepository extends CacheCrudRepository<UserProfile, UserProfileEntity> {
    constructor() {
        super(new UserProfileDaoPostgres(), new UserProfileDaoRedis(), new UserProfileMapper());
    }
}
