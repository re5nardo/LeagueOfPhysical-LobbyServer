import { UserStats } from '@interfaces/user-stats.interface';
import { UserStatsResponseDto } from '@dtos/user-stats.dto';

export class UserStatsMapper {
    public static toUserStatsResponseDto(userStats: UserStats): UserStatsResponseDto {
        return {
            userId: userStats.userId,
            gameMode: userStats.gameMode,
            gamesPlayed: userStats.gamesPlayed,
            wins: userStats.wins,
            losses: userStats.losses,
            draws: userStats.draws,
            eloRating: userStats.eloRating,
            tier: userStats.tier,
        };
    }
}
