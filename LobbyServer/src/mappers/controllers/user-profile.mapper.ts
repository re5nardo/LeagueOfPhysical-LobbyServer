import { UserProfile } from '@interfaces/user-profile.interface';
import { UserProfileResponseDto } from '@dtos/user-profile.dto';

export class UserProfileMapper {
    public static toUserProfileResponseDto(userProfile: UserProfile): UserProfileResponseDto {
        return {
            userId: userProfile.userId,
            nickname: userProfile.nickname ?? '',
            avatarUrl: userProfile.avatarUrl ?? '',
            bio: userProfile.bio ?? '',
        };
    }
}
