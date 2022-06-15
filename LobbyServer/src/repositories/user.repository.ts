import { User } from '@interfaces/user.interface';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserDaoMongoose } from '@daos/user.dao.mongoose';
import { UserDaoRedis } from '@daos/user.dao.redis';

export class UserRepository extends CacheCrudRepository<User, string> {
    constructor() {
        super(new UserDaoMongoose(), new UserDaoRedis());
    }
}
