import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { UserCreateDto, UserUpdateDto, UserLocationUpdateDto } from '@dtos/user.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UserRoute implements Routes {
    public path = '/user';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //#region Location
        this.router.put(`${this.path}/verify-location/:id`, this.userController.verifyUserLocation);
        this.router.put(`${this.path}/location`, validationMiddleware(UserLocationUpdateDto, 'body'), this.userController.updateUserLocation);
        //#endregion

        this.router.get(`${this.path}/all`, this.userController.getUsers);
        this.router.get(`${this.path}/:id`, this.userController.getUserById);
        this.router.post(`${this.path}`, validationMiddleware(UserCreateDto, 'body'), this.userController.createUser);
        this.router.put(`${this.path}/:id`, validationMiddleware(UserUpdateDto, 'body', true), this.userController.updateUser);
        this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
    }
}

export default UserRoute;
