import { UserStats } from '@interfaces/user-stats.interface';
import { UserStats as UserStatsEntity } from '@prisma/client';
import * as Entity from '@prisma/client';
import { DomainEntityMapper } from '@mappers/domain.entity.mapper'
import { GameMode } from '@interfaces/enums';

export class UserStatsMapper implements DomainEntityMapper<UserStats, UserStatsEntity> {
    public toDomain(entity: UserStatsEntity): UserStats {
        return {
            id: entity.id,
            userId: entity.userId,
            gameMode: this.toGameMode(entity.gameMode),
            gamesPlayed: entity.gamesPlayed,
            wins: entity.wins,
            losses: entity.losses,
            draws: entity.draws,
            eloRating: entity.eloRating,
            mmr: entity.mmr,
            tier: entity.tier,
        };
    }

    public toEntity(domain: UserStats): UserStatsEntity {
        return {
            id: domain.id,
            userId: domain.userId,
            gameMode: this.toEntity_GameMode(domain.gameMode),
            gamesPlayed: domain.gamesPlayed,
            wins: domain.wins,
            losses: domain.losses,
            draws: domain.draws,
            eloRating: domain.eloRating,
            mmr: domain.mmr,
            tier: domain.tier,
        } as UserStatsEntity;
    }

    public toDomains(entities: Iterable<UserStatsEntity>): Iterable<UserStats> {
        return Array.from(entities, (entity) => this.toDomain(entity));
    }

    public toEntities(domains: Iterable<UserStats>): Iterable<UserStatsEntity> {
        return Array.from(domains, (domain) => this.toEntity(domain));
    }

    public getEntityFieldName<K extends keyof UserStats>(field: K): string {
        switch (field) {
            default: return field;
        }
    }
    
    public toEntityValue<K extends keyof UserStats>(field: K, value: UserStats[K]): any {
        switch (field) {
            case "gameMode":
                return this.toEntity_GameMode(value as GameMode);
            default:
                return value;
        }
    }

    private toGameMode(entity_gameMode: Entity.GameMode): GameMode {
            switch (entity_gameMode) {
                case Entity.GameMode.Normal:
                    return GameMode.Normal;
                case Entity.GameMode.Ranked:
                    return GameMode.Ranked;
            }
        }
    
        private toEntity_GameMode(gameMode: GameMode): Entity.GameMode {
            switch (gameMode) {
                case GameMode.Normal:
                    return Entity.GameMode.Normal;
                case GameMode.Ranked:
                    return Entity.GameMode.Ranked;
            }
        }
}
