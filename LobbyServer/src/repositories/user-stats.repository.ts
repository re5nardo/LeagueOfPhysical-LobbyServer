import { UserStats } from '@interfaces/user-stats.interface';
import { UserStats as UserStatsEntity } from '@prisma/client';
import { CacheCrudRepository } from '@repositories/cacheCrudRepository';
import { UserStatsDaoPostgres } from '@daos/user-stats.dao.postgres';
import { UserStatsDaoRedis } from '@daos/user-stats.dao.redis';
import { UserStatsMapper } from '@mappers/entities/user-stats.mapper';

export class UserStatsRepository extends CacheCrudRepository<UserStats, UserStatsEntity> {
    constructor() {
        super(new UserStatsDaoPostgres(), new UserStatsDaoRedis(), new UserStatsMapper());
    }
}
