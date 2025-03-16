import { CreateUserDto, CreateUserResponseDto, GetUserResponseDto, FindAllUsersResponseDto, UserResponseDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import { UserRepository } from '@repositories/user.repository';
import { ResponseCode } from '@interfaces/responseCode.interface';
import { UserMapper } from '@mappers/controllers/user.mapper';
import { ResponseBase } from '@src/interfaces/responseBase.interface';

class UserService {
    private userRepository = new UserRepository();

    public async findAllUsers(): Promise<FindAllUsersResponseDto> {
        try {
            const users = await this.userRepository.findAll() as User[];
            return {
                code: ResponseCode.SUCCESS,
                users: Array.from(users).map<UserResponseDto>(user => UserMapper.toUserResponseDto(user)),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findAllUsersById(ids: Iterable<string>): Promise<FindAllUsersResponseDto> {
        try {
            const users = await this.userRepository.findAllById(ids) as User[];
            return {
                code: ResponseCode.SUCCESS,
                users: Array.from(users).map<UserResponseDto>(user => UserMapper.toUserResponseDto(user)),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findUserById(id: string): Promise<GetUserResponseDto> {
        try {
            const findUser = await this.userRepository.findById(id);
            if (!findUser) {
                return {
                    code: ResponseCode.USER_NOT_EXIST
                };
            }
            return {
                code: ResponseCode.SUCCESS,
                user: UserMapper.toUserResponseDto(findUser),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
        try {
            const user = UserMapper.CreateUserDto.toEntity(createUserDto);
            await this.userRepository.save(user);
            return {
                code: ResponseCode.SUCCESS,
                user: UserMapper.toUserResponseDto(user),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteUser(user: User): Promise<ResponseBase> {
        try {
            await this.userRepository.delete(user);
            return {
                code: ResponseCode.SUCCESS,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteUserById(id: string): Promise<ResponseBase> {
        try {
            await this.userRepository.deleteById(id);
            return {
                code: ResponseCode.SUCCESS,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async createUsers(createUserDtos: CreateUserDto[]): Promise<ResponseBase> {
        try {
            const users: User[] = [];
            for (const createUserDto of createUserDtos) {
                users.push(UserMapper.CreateUserDto.toEntity(createUserDto));
            }
            await this.userRepository.saveAll(users);
            return {
                code: ResponseCode.SUCCESS,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async count(): Promise<number> {
        try {
            return await this.userRepository.count();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async existsById(id: string): Promise<boolean> {
        try {
            return await this.userRepository.existsById(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteAllUsers(users?: Iterable<User>): Promise<ResponseBase> {
        try {
            if (users) {
                await this.userRepository.deleteAll(users);
            } else {
                await this.userRepository.deleteAll();
            }
            return {
                code: ResponseCode.SUCCESS,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteAllUsersById(ids: Iterable<string>): Promise<ResponseBase> {
        try {
            await this.userRepository.deleteAllById(ids);
            return {
                code: ResponseCode.SUCCESS,
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default UserService;
