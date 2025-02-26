import { User } from "@interfaces/user.interface";
import { PrismaClient } from "@prisma/client";
import { DaoPostgresBase } from "@daos/dao.postgres.base";
import { prismaClient } from '@loaders/postgres.loader';

export class UserDaoPostgres extends DaoPostgresBase<User, PrismaClient["user"]> {
    constructor() {
        super(prismaClient, prismaClient.user);
    }
}
