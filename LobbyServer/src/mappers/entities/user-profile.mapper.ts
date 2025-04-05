import { UserProfile } from '@interfaces/user-profile.interface';
import { UserProfile as UserProfileEntity } from '@prisma/client';
import { DomainEntityMapper } from '@mappers/domain.entity.mapper'

export class UserProfileMapper implements DomainEntityMapper<UserProfile, UserProfileEntity> {
    public toDomain(entity: UserProfileEntity): UserProfile {
        return {
            id: entity.id,
            nickname: entity.nickname ?? undefined,
            avatarUrl: entity.avatarUrl ?? undefined,
            bio: entity.bio ?? undefined,
            userId: entity.userId,
        };
    }

    public toEntity(domain: UserProfile): UserProfileEntity {
        return {
            id: domain.id,
            nickname: domain.nickname ?? null,
            avatarUrl: domain.avatarUrl ?? null,
            bio: domain.bio ?? null,
            userId: domain.userId,
        };
    }

    public toDomains(entities: Iterable<UserProfileEntity>): Iterable<UserProfile> {
        return Array.from(entities, (entity) => this.toDomain(entity));
    }

    public toEntities(domains: Iterable<UserProfile>): Iterable<UserProfileEntity> {
        return Array.from(domains, (domain) => this.toEntity(domain));
    }

    public getEntityFieldName<K extends keyof UserProfile>(field: K): string {
        switch (field) {
            default:
                return field;
        }
    }
    
    public toEntityValue<K extends keyof UserProfile>(field: K, value: UserProfile[K]): any {
        switch (field) {
            default:
                return value;
        }
    }
}
