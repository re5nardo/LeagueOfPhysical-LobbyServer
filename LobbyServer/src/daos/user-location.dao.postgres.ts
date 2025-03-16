import { PrismaClient, UserLocation as UserLocationEntity } from '@prisma/client';
import { DaoPostgresBase } from "@daos/dao.postgres.base";
import { prismaClient } from '@loaders/postgres.loader';

export class UserLocationDaoPostgres extends DaoPostgresBase<UserLocationEntity, PrismaClient["userLocation"]> {
    constructor() {
        super(prismaClient, prismaClient.userLocation);
    }
}
