import { NextFunction, Request, Response } from 'express';
import { CreateUserMatchDto } from '@dtos/user.match.dto';
import { UserMatch } from '@interfaces/user.match.interface';
import userMatchService from '@services/user.match.service';

class UserMatchController {
  private userMatchService = new userMatchService();

  public getUserMatchs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUserMatchsData: UserMatch[] = await this.userMatchService.findAllUserMatch();

      res.status(200).json({ data: findAllUserMatchsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserMatchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserMatchData: UserMatch = await this.userMatchService.findUserMatchById(userId);

      res.status(200).json({ data: findOneUserMatchData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUserMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userMatchData: CreateUserMatchDto = req.body;
      const createUserMatchData: UserMatch = await this.userMatchService.createUserMatch(userMatchData);

      res.status(201).json({ data: createUserMatchData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userMatchData: CreateUserMatchDto = req.body;
      const updateUserMatchData: UserMatch = await this.userMatchService.updateUserMatch(userId, userMatchData);

      res.status(200).json({ data: updateUserMatchData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUserMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserMatchData: UserMatch = await this.userMatchService.deleteUserMatch(userId);

      res.status(200).json({ data: deleteUserMatchData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserMatchController;
