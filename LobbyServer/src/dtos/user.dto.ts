import { IsNumber, IsString, IsEnum, IsObject } from 'class-validator';
import { Location, LocationDetail } from '@interfaces/user.location.interface';

export class CreateUserDto {
    @IsString()
    public id: string;

    @IsString()
    public nickname: string;
}

export class UpdateUserDto {
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
