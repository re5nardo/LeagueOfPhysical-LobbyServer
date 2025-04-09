import { PrismaClient, UserStats as UserStatsEntity } from '@prisma/client';
import { DaoPostgresBase } from '@daos/dao.postgres.base';
import { prismaClient } from '@loaders/postgres.loader';

export class UserStatsDaoPostgres extends DaoPostgresBase<UserStatsEntity, PrismaClient["userStats"]> {
    constructor() {
        super(prismaClient, prismaClient.userStats);
    }
}
