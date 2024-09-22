import { User } from "@interfaces/user.interface";
import { CreateUserDto, UserResponseDto } from "@dtos/user.dto";
import { UserFactory } from '@factories/user.factory';

export class UserMapper {
    static CreateUserDto = class {
        public static toEntity(createUserDto: CreateUserDto): User {
            return UserFactory.create({
                id: createUserDto.id,
                nickname: createUserDto.nickname
            });
        }
    };

    public static toUserResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            nickname: user.nickname,
            masterExp: user.masterExp,
            friendlyRating: user.friendlyRating,
            rankRating: user.rankRating,
            goldCoin: user.goldCoin,
            gem: user.gem,
        };
    }
}
