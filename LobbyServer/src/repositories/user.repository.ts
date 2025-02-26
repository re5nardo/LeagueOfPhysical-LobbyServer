import { User } from '@interfaces/user.interface';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserDaoPostgres } from '@daos/user.dao.postgres';
import { UserDaoRedis } from '@daos/user.dao.redis';

export class UserRepository extends CacheCrudRepository<User> {
    constructor() {
        super(new UserDaoPostgres(), new UserDaoRedis());
    }
}
