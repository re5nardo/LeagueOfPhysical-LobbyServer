import { IsNumber, IsString, IsEnum, IsObject } from 'class-validator';
import { Location, LocationDetail } from '@interfaces/user.location.interface';
import { User } from '@interfaces/user.interface';
import { UserFactory } from '@factories/user.factory';
import { ResponseBase } from '@interfaces/responseBase.interface';

export class UserCreateDto {
    @IsString()
    public id: string;

    @IsString()
    public nickname: string;

    public toEntity(): User {
        return UserFactory.create({
            id: this.id,
            nickname: this.nickname,
        });
    }
}

export class UserUpdateDto {
    // @IsNumber()
    // public masterExp: number;

    // @IsNumber()
    // public friendlyRating: number;

    // @IsNumber()
    // public rankRating: number;

    // @IsNumber()
    // public goldCoin: number;

    // @IsNumber()
    // public gem: number;

    @IsEnum(Location)
    public location: Location;

    @IsObject()
    public locationDetail: LocationDetail;

    public toEntity(user: User): User {
        // user.masterExp = this.masterExp;
        // user.friendlyRating = this.friendlyRating;
        // user.rankRating = this.rankRating;
        // user.goldCoin = this.goldCoin;
        // user.gem = this.gem;
        user.location = this.location;
        user.locationDetail = this.locationDetail;
        return user;
    }
}

export class UserLocationUpdateDto {
    @IsString()
    public userId: string;

    @IsEnum(Location)
    public location: Location;

    @IsObject()
    public locationDetail: LocationDetail;
}

export class UserResponseDto {
    public id: string;
    public nickname: string;
    public masterExp: number;
    public friendlyRating: number;
    public rankRating: number;
    public goldCoin: number;
    public gem: number;
    public location: Location;
    public locationDetail: LocationDetail;

    private constructor(user: User) {
        this.id = user.id;
        this.nickname = user.nickname;
        this.masterExp = user.masterExp;
        this.friendlyRating = user.friendlyRating;
        this.rankRating = user.rankRating;
        this.goldCoin = user.goldCoin;
        this.gem = user.gem;
        this.location = user.location;
        this.locationDetail = user.locationDetail;
    }

    public static from(user: User): UserResponseDto {
        return new UserResponseDto(user);
    }
}

export class GetUserResponseDto implements ResponseBase {
    public code: number;
    public user?: UserResponseDto;
}

export class VerifyUserLocationResponseDto implements ResponseBase {
    public code: number;
    public user?: UserResponseDto;
}

export class UpdateUserLocationResponseDto implements ResponseBase {
    public code: number;
    public user?: UserResponseDto;
}
