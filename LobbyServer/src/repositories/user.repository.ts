import { User } from '@interfaces/user.interface';
import { User as UserEntity } from '@prisma/client';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserDaoPostgres } from '@daos/user.dao.postgres';
import { UserDaoRedis } from '@daos/user.dao.redis';
import { UserMapper } from '@mappers/entities/user.mapper'

export class UserRepository extends CacheCrudRepository<User, UserEntity> {
    constructor() {
        super(new UserDaoPostgres(), new UserDaoRedis(), new UserMapper());
    }
}
