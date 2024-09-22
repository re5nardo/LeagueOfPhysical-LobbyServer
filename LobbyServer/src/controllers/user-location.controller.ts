import { NextFunction, Request, Response } from 'express';
import { UpdateUserLocationDto } from '@dtos/user-location.dto';
import UserLocationService from '@services/user-location.service';

class UserLocationController {
    private userLocationService = new UserLocationService();

    public getOrCreateUserLocationById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const response = await this.userLocationService.getOrCreateUserLocationById(userId);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };

    public updateUserLocation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateUserLocationDto: UpdateUserLocationDto = req.body;
            const response = await this.userLocationService.updateUserLocation(updateUserLocationDto);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default UserLocationController;
