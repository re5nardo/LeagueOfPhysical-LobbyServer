import { IsNumber, IsString, IsEnum, IsObject, IsArray, ValidateNested } from 'class-validator';
import { ResponseBase } from '@interfaces/responseBase.interface';

export class CreateUserDto {
    @IsString()
    public id: string;

    @IsString()
    public nickname: string;
}

export class UserResponseDto {
    public id: string;
    public nickname: string;
    public masterExp: number;
    public friendlyRating: number;
    public rankRating: number;
    public goldCoin: number;
    public gem: number;
}

export class CreateUserResponseDto implements ResponseBase {
    public code: number;
    public user?: UserResponseDto;
}

export class GetUserResponseDto implements ResponseBase {
    public code: number;
    public user?: UserResponseDto;
}

export class FindAllUsersResponseDto implements ResponseBase {
    public code: number;
    public users?: UserResponseDto[];
}
