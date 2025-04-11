import { UserStats, GameMode } from '@interfaces/user-stats.interface';

export class UserStatsFactory {
    public static create(properties?: Partial<UserStats>): UserStats {
        return { ...UserStatsFactory.createDefault(), ...properties };
    }

    private static createDefault(): UserStats {
        return {
            id: '',
            userId: '',
            gameMode: GameMode.Normal,
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            eloRating: 1000,
            mmr: 1000,
            tier: 'BRONZE',
        };
    }
}
