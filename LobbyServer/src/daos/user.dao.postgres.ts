import { PrismaClient, User as UserEntity } from '@prisma/client';
import { DaoPostgresBase } from "@daos/dao.postgres.base";
import { prismaClient } from '@loaders/postgres.loader';

export class UserDaoPostgres extends DaoPostgresBase<UserEntity, PrismaClient["user"]> {
    constructor() {
        super(prismaClient, prismaClient.user);
    }
}
