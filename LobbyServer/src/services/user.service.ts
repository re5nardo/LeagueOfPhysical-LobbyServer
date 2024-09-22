import { CreateUserDto, CreateUserResponseDto, GetUserResponseDto, FindAllUsersResponseDto } from '@dtos/user.dto';
import { User } from '@interfaces/user.interface';
import { UserRepository } from '@repositories/user.repository';
import { ResponseCode } from '@interfaces/responseCode.interface';
import { UserMapper } from '@mappers/user.mapper';

class UserService {
    private userRepository = new UserRepository();
    
    public async findAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.findAll() as User[];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findAllUsersById(ids: Iterable<string>): Promise<FindAllUsersResponseDto> {
        try {
            return {
                code: ResponseCode.SUCCESS,
                users: await this.userRepository.findAllById(ids) as User[]
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
                user: findUser
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
        try {
            return {
                code: ResponseCode.SUCCESS,
                user: await this.userRepository.save(UserMapper.CreateUserDto.toEntity(createUserDto))
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteUser(user: User): Promise<void> {
        try {
            return await this.userRepository.delete(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteUserById(id: string): Promise<void> {
        try {
            return await this.userRepository.deleteById(id);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async createUsers(createUserDtos: CreateUserDto[]): Promise<void> {
        try {
            const users: User[] = [];
            for (const createUserDto of createUserDtos) {
                users.push(UserMapper.CreateUserDto.toEntity(createUserDto));
            }
            return await this.userRepository.saveAll(users);
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

    public async deleteAllUsers(users?: Iterable<User>): Promise<void> {
        try {
            if (users) {
                return await this.userRepository.deleteAll(users);
            } else {
                return await this.userRepository.deleteAll();
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async deleteAllUsersById(ids: Iterable<string>): Promise<void> {
        try {
            return await this.userRepository.deleteAllById(ids);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default UserService;
