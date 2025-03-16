import { UserLocation as UserLocationEntity } from '@prisma/client';
import { DaoRedisBase } from '@daos/dao.redis.base';

const TTL: number = 5 * 60;  //  sec
const USER_LOCATION_PREFIX: string = 'USER_LOCATION_PREFIX';

export class UserLocationDaoRedis extends DaoRedisBase<UserLocationEntity> {

    get Prefix() : string {
        return USER_LOCATION_PREFIX;
    }

    get TTL() : number {
        return TTL;
    }
}
