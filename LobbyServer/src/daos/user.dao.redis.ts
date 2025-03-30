import { User as UserEntity } from '@prisma/client';
import { DaoRedisBase } from '@daos/dao.redis.base';

const TTL: number = 5 * 60;  //  sec
const USER_PREFIX: string = 'USER_PREFIX';

export class UserDaoRedis extends DaoRedisBase<UserEntity> {

    get Prefix() : string {
        return USER_PREFIX;
    }

    get TTL() : number {
        return TTL;
    }
}
