import { UserStats as UserStatsEntity } from '@prisma/client';
import { DaoRedisBase } from '@daos/dao.redis.base';

const TTL: number = 5 * 60;  //  sec
const USER_STATS_PREFIX: string = 'USER_STATS_PREFIX';

export class UserStatsDaoRedis extends DaoRedisBase<UserStatsEntity> {

    get Prefix() : string {
        return USER_STATS_PREFIX;
    }

    get TTL() : number {
        return TTL;
    }
}
