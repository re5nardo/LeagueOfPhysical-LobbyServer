import { UpdateUserProfileDto, UpdateUserProfileResponseDto } from '@dtos/user-profile.dto';
import { UserProfileRepository } from '@repositories/user-profile.repository';
import { ResponseCode } from '@interfaces/responseCode.interface';
import { UserProfileFactory } from '@factories/user-profile.factory';
import { UserProfileMapper } from '@mappers/controllers/user-profile.mapper';

class UserProfileService {

    private userProfileRepository = new UserProfileRepository();

    public async updateUserProfile(updateUserProfileDto: UpdateUserProfileDto): Promise<UpdateUserProfileResponseDto> {
        try {
            let userProfile = await this.userProfileRepository.findById(updateUserProfileDto.userId);
            if (!userProfile) {
                userProfile = UserProfileFactory.create({
                    userId: updateUserProfileDto.userId,
                    nickname: updateUserProfileDto.nickname,
                    bio: updateUserProfileDto.bio,
                });
            }

            userProfile = await this.userProfileRepository.save(userProfile);

            return {
                code: ResponseCode.SUCCESS,
                userProfile: UserProfileMapper.toUserProfileResponseDto(userProfile),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default UserProfileService;
