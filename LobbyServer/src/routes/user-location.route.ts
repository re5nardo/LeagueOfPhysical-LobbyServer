import { Router } from 'express';
import UserLocationController from '@controllers/user-location.controller';
import { UpdateUserLocationDto } from '@dtos/user-location.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UserLocationRoute implements Routes {
    public path = '/user';
    public router = Router();
    public userLocationController = new UserLocationController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:userId/location`, this.userLocationController.getOrCreateUserLocationById);
        this.router.put(`${this.path}/location`, validationMiddleware(UpdateUserLocationDto, 'body'), this.userLocationController.updateUserLocation);
    }
}

export default UserLocationRoute;
