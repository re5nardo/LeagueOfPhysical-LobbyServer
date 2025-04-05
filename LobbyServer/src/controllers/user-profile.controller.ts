import { NextFunction, Request, Response } from 'express';
import { UpdateUserProfileDto } from '@dtos/user-profile.dto';
import UserProfileService from '@services/user-profile.service';

class UserProfileController {
    private userProfileService = new UserProfileService();

    public updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateUserProfileDto: UpdateUserProfileDto = req.body;
            const response = await this.userProfileService.updateUserProfile(updateUserProfileDto);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default UserProfileController;
