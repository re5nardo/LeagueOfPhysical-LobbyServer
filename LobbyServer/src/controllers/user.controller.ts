import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, UserResponseDto, UpdateUserLocationDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import UserService from '@services/user.service';
import { UserMapper } from '@mappers/user.mapper';

class UserController {
    private userService = new UserService();

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUsers();
            const users: UserResponseDto[] = Array.from(findAllUsersData).map<UserResponseDto>(userData => UserMapper.toUserResponseDto(userData));

            res.status(200).json({ data: users, message: 'findAll' }); //  BaseResponse?
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

    public verifyUserLocation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            const response = await this.userService.verifyUserLocation(userId);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    public updateUserLocation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateUserLocationDto: UpdateUserLocationDto = req.body;
            const response = await this.userService.updateUserLocation(updateUserLocationDto);
            res.status(200).json(response);
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
