import { PrismaClient, UserProfile as UserProfileEntity } from '@prisma/client';
import { DaoPostgresBase } from "@daos/dao.postgres.base";
import { prismaClient } from '@loaders/postgres.loader';

export class UserProfileDaoPostgres extends DaoPostgresBase<UserProfileEntity, PrismaClient["userProfile"]> {
    constructor() {
        super(prismaClient, prismaClient.userProfile);
    }
}
