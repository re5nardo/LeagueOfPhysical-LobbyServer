import { User } from '@interfaces/user.interface';
import { CreateUserDto, UserResponseDto } from '@dtos/user.dto';
import { UserFactory } from '@factories/user.factory';

export class UserMapper {
    static CreateUserDto = class {
        public static toEntity(createUserDto: CreateUserDto): User {
            return UserFactory.create({
                username: createUserDto.username,
                email: createUserDto.email,
            });
        }
    };

    public static toUserResponseDto(user: User): UserResponseDto {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    }
}
