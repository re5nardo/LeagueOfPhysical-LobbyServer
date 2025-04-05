import { UserProfile as UserProfileEntity } from '@prisma/client';
import { DaoRedisBase } from '@daos/dao.redis.base';

const TTL: number = 5 * 60;  //  sec
const USER_PROFILE_PREFIX: string = 'USER_PROFILE_PREFIX';

export class UserProfileDaoRedis extends DaoRedisBase<UserProfileEntity> {

    get Prefix() : string {
        return USER_PROFILE_PREFIX;
    }

    get TTL() : number {
        return TTL;
    }
}
