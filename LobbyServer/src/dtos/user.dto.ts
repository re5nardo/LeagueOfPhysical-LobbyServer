import { IsNumber, IsString, IsEnum, IsObject, IsArray, ValidateNested } from 'class-validator';
import { ResponseBase } from '@interfaces/responseBase.interface';

export class CreateUserDto {
    @IsString()
    public username: string;

    @IsString()
    public email: string;
}

export class UserResponseDto {
    public id: string;
    public username: string;
    public email: string;
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
