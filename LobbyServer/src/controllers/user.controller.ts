import { NextFunction, Request, Response } from 'express';
import { UserCreateDto, UserUpdateDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import userService from '@services/user.service';

class UserController {
    private userService = new userService();

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUser();

            res.status(200).json({ data: findAllUsersData, message: 'findAll' }); //  BaseResponse?
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const findOneUserData: User = await this.userService.findUserById(userId);

            res.status(200).json({ data: findOneUserData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userCreateDto: UserCreateDto = req.body;
            const createUserData: User = await this.userService.createUser(userCreateDto);

            res.status(201).json({ data: createUserData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const userUpdateDto: UserUpdateDto = req.body;
            const updateUserData: User = await this.userService.updateUser(userId, userUpdateDto);

            res.status(200).json({ data: updateUserData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            await this.userService.deleteUser(userId);

            res.status(200).json({ data: {}, message: `userId: ${userId} deleted` });
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
