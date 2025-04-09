import { GetUserStatsResponseDto } from '@dtos/user-stats.dto';
import { UserStatsRepository } from '@repositories/user-stats.repository';
import { ResponseCode } from '@interfaces/responseCode.interface';
import { GameMode } from '@interfaces/user-stats.interface';
import { UserStatsMapper } from '@mappers/controllers/user-stats.mapper';

class UserStatsService {

    private userStatsRepository = new UserStatsRepository();

    public async findUserStatsById(userId: string, gameMode: GameMode): Promise<GetUserStatsResponseDto> {
        try {
            let userStats = await this.userStatsRepository.findWhere([
                ['userId', userId],
                ['gameMode', gameMode],
            ]);

            if (!userStats) {
                return {
                    code: ResponseCode.USER_STATS_NOT_EXIST
                };
            }

            userStats = await this.userStatsRepository.save(userStats);

            return {
                code: ResponseCode.SUCCESS,
                userStats: UserStatsMapper.toUserStatsResponseDto(userStats),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default UserStatsService;
