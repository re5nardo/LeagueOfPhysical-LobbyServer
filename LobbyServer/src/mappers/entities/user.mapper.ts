import { User } from '@interfaces/user.interface';
import { User as UserEntity } from '@prisma/client';
import { DomainEntityMapper } from '@mappers/domain.entity.mapper'

export class UserMapper implements DomainEntityMapper<User, UserEntity> {
    public toDomain(entity: UserEntity): User {
        return {
            id: entity.id,
            nickname: entity.nickname,
            masterExp: entity.masterExp,
            friendlyRating: entity.friendlyRating,
            rankRating: entity.rankRating,
            goldCoin: entity.goldCoin,
            gem: entity.gem,
        };
    }

    public toEntity(domain: User): UserEntity {
        return {
            id: domain.id,
            nickname: domain.nickname,
            masterExp: domain.masterExp,
            friendlyRating: domain.friendlyRating,
            rankRating: domain.rankRating,
            goldCoin: domain.goldCoin,
            gem: domain.gem,
        };
    }

    public toDomains(entities: Iterable<UserEntity>): Iterable<User> {
        return Array.from(entities, (entity) => this.toDomain(entity));
    }

    public toEntities(domains: Iterable<User>): Iterable<UserEntity> {
        return Array.from(domains, (domain) => this.toEntity(domain));
    }

    public getEntityFieldName<K extends keyof User>(field: K): string {
        switch (field) {
            case 'id':
                return 'id';
            case 'nickname':
                return 'nickname';
            case 'masterExp':
                return 'masterExp';
            case 'friendlyRating':
                return 'friendlyRating';
            case 'rankRating':
                return 'rankRating';
            case 'goldCoin':
                return 'goldCoin';
            case 'gem':
                return 'gem';
            default:
                throw new Error(`Invalid field: ${field}`);
        }
    }

    public toEntityValue<K extends keyof User>(field: K, value: User[K]): any {
        return value;
    }
}
