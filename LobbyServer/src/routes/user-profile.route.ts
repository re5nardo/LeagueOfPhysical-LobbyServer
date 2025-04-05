import { Router } from 'express';
import UserProfileController from '@controllers/user-profile.controller';
import { UpdateUserProfileDto } from '@dtos/user-profile.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UserProfileRoute implements Routes {
    public path = '/user';
    public router = Router();
    public userProfileController = new UserProfileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.put(`${this.path}/profile`, validationMiddleware(UpdateUserProfileDto, 'body'), this.userProfileController.updateUserProfile);
    }
}

export default UserProfileRoute;
