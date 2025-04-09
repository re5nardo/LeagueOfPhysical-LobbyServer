import { Router } from 'express';
import UserStatsController from '@controllers/user-stats.controller';
import { Routes } from '@interfaces/routes.interface';

class UserStatsRoute implements Routes {
    public path = '/user';
    public router = Router();
    public userStatsController = new UserStatsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:userId/stats`, this.userStatsController.getUserStatsById);
    }
}

export default UserStatsRoute;
