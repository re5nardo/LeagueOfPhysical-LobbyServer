import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, UserResponseDto } from '@dtos/user.dto';
import UserService from '@services/user.service';

class UserController {
    private userService = new UserService();

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.userService.findAllUsers();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const response = await this.userService.findUserById(userId);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createUserDto: CreateUserDto = req.body;
            const response = await this.userService.createUser(createUserDto);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };
    
    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            await this.userService.deleteUserById(userId);

            res.status(200).json({ data: {}, message: `userId: ${userId} deleted` });
        } catch (error) {
            next(error);
        }
    };
    
    public findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ids = req.query.ids as string[];
            const response = await this.userService.findAllUsersById(ids);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
