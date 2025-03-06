import { UserLocation } from "@interfaces/user-location.interface";
import { PrismaClient } from "@prisma/client";
import { DaoPostgresBase } from "@daos/dao.postgres.base";
import { prismaClient } from '@loaders/postgres.loader';

export class UserLocationDaoPostgres extends DaoPostgresBase<UserLocation, PrismaClient["userLocation"]> {
    constructor() {
        super(prismaClient, prismaClient.userLocation);
    }
}
