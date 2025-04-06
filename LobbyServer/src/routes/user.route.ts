import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { CreateUserDto } from '@dtos/user.dto';
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
        this.router.get(`${this.path}/all`, this.userController.getUsers);
        this.router.get(`${this.path}/findAll`, this.userController.findAllUsers);
        this.router.get(`${this.path}/:id`, this.userController.getUserById);
        this.router.get(`${this.path}/username/:username`, this.userController.getUserByUsername);
        this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);
        this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
    }
}

export default UserRoute;
