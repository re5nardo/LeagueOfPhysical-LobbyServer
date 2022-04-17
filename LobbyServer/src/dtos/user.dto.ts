import { IsNumber, IsString, IsEnum, IsObject } from 'class-validator';
import { Location, LocationDetail } from '@interfaces/user.location.interface';

export class UserCreateDto {
    @IsString()
    public id: string;

    @IsString()
    public nickname: string;
}

export class UserUpdateDto {
    @IsNumber()
    public masterExp: number;

    @IsNumber()
    public friendlyRating: number;

    @IsNumber()
    public rankRating: number;

    @IsNumber()
    public goldCoin: number;

    @IsNumber()
    public gem: number;

    @IsEnum(Location)
    public location: Location;

    @IsObject()
    public locationDetail: LocationDetail;
}

export class UserResponseDto {
    @IsString()
    public id: string;

    @IsString()
    public nickname: string;

    @IsNumber()
    public masterExp: number;

    @IsNumber()
    public friendlyRating: number;

    @IsNumber()
    public rankRating: number;

    @IsNumber()
    public goldCoin: number;

    @IsNumber()
    public gem: number;
}
