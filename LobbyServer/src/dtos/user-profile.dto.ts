import { IsString } from 'class-validator';
import { ResponseBase } from '@interfaces/responseBase.interface';

export class UpdateUserProfileDto {
    @IsString()
    public userId: string;

    @IsString()
    public nickname: string;

    @IsString()
    public bio: string;
}

export class UserProfileResponseDto {
    public userId: string;
    public nickname: string;
    public avatarUrl: string;
    public bio: string;
}

export class UpdateUserProfileResponseDto implements ResponseBase {
    public code: number;
    public userProfile?: UserProfileResponseDto;
}
