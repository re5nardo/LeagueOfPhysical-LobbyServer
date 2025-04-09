import { NextFunction, Request, Response } from 'express';
import { GameMode } from '@interfaces/user-stats.interface';
import UserStatsService from '@services/user-stats.service';

class UserStatsController {
    private userStatsService = new UserStatsService();

    public getUserStatsById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId;
            const gameMode = Number(req.query.gameMode as unknown) as GameMode;
            const response = await this.userStatsService.findUserStatsById(userId, gameMode);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default UserStatsController;
