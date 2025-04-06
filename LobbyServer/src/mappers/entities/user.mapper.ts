import { User } from '@interfaces/user.interface';
import { User as UserEntity } from '@prisma/client';
import { DomainEntityMapper } from '@mappers/domain.entity.mapper'

export class UserMapper implements DomainEntityMapper<User, UserEntity> {
    public toDomain(entity: UserEntity): User {
        return {
            id: entity.id,
            username: entity.username,
            email: entity.email,
            passwordHash: entity.passwordHash,
            lastLoginAt: entity.lastLoginAt,
        };
    }

    public toEntity(domain: User): UserEntity {
        return {
            id: domain.id,
            username: domain.username,
            email: domain.email,
            passwordHash: domain.passwordHash,
            lastLoginAt: domain.lastLoginAt,
        } as UserEntity;
    }

    public toDomains(entities: Iterable<UserEntity>): Iterable<User> {
        return Array.from(entities, (entity) => this.toDomain(entity));
    }

    public toEntities(domains: Iterable<User>): Iterable<UserEntity> {
        return Array.from(domains, (domain) => this.toEntity(domain));
    }

    public getEntityFieldName<K extends keyof User>(field: K): string {
        switch (field) {
            default: return field;
        }
    }

    public toEntityValue<K extends keyof User>(field: K, value: User[K]): any {
        switch (field) {
            default: return value;
        }
    }
}
