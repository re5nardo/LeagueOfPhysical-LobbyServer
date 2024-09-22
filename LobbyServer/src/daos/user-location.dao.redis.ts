import { UserLocation } from '@interfaces/user-location.interface';
import { DaoRedisBase } from '@daos/dao.redis.base';

const TTL: number = 5 * 60;  //  sec
const USER_LOCATION_PREFIX: string = 'USER_LOCATION_PREFIX';

export class UserLocationDaoRedis extends DaoRedisBase<UserLocation> {

    get Prefix() : string {
        return USER_LOCATION_PREFIX;
    }

    get TTL() : number {
        return TTL;
    }
}
