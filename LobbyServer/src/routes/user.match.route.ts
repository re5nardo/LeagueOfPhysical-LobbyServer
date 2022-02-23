import { Router } from 'express';
import UserMatchController from '@controllers/user.match.controller';
import { CreateUserMatchDto } from '@dtos/user.match.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UserMatchRoute implements Routes {
  public path = '/user/match';
  public router = Router();
  public userMatchController = new UserMatchController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.userMatchController.getUserMatchs);
    this.router.get(`${this.path}/:id`, this.userMatchController.getUserMatchById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserMatchDto, 'body'), this.userMatchController.createUserMatch);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserMatchDto, 'body', true), this.userMatchController.updateUserMatch);
    this.router.delete(`${this.path}/:id`, this.userMatchController.deleteUserMatch);
  }
}

export default UserMatchRoute;
