import { UserCreateDto, UserUpdateDto } from '@dtos/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/user.interface';
import { isEmpty } from '@utils/util';
import { UserRepository } from '@repositories/user.repository.interface';
import { UserRepositoryImpl } from '@repositories/user.repository';
import { UserDaoMongooseImpl } from '@daos/user.dao.mongoose';
import { UserDaoRedisImpl } from '@daos/user.dao.redis';

class UserService {
    
    private userRepository: UserRepository = new UserRepositoryImpl(new UserDaoMongooseImpl(), new UserDaoRedisImpl());

    public async findAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.findAll() as User[];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findAllUsersById(ids: Iterable<string>): Promise<User[]> {
        try {
            return await this.userRepository.findAllById(ids) as User[];
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findUserById(id: string): Promise<User> {
        try {
            if (isEmpty(id)) {
                throw new HttpException(400, "You're not id");
            }

            const findUser = await this.userRepository.findById(id);
            if (!findUser) {
                throw new HttpException(409, "You're not user");
            }
            return findUser;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async createUser(userCreateDto: UserCreateDto): Promise<User> {
        try {
            if (isEmpty(userCreateDto)) {
                throw new HttpException(400, "You're not userData");
            }

            //const findUser = await this.userModel.findOne({ email: userData.email });
            //if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

            //const hashedPassword = await hash(userData.password, 10);

            return await this.userRepository.save(userCreateDto.toEntity());
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async updateUser(id: string, userUpdateDto: UserUpdateDto): Promise<User> {
        try {
            if (isEmpty(userUpdateDto)) {
                throw new HttpException(400, "You're not userData");
            }

            // if (userData.nickname) {
            //   const findUser = await this.userModel.findOne({ nickname: userData.nickname });
            //   if (findUser && findUser._id != id) throw new HttpException(409, `You're nickname ${userData.nickname} already exists`);
            // }

            // if (userData.password) {
            //   const hashedPassword = await hash(userData.password, 10);
            //   userData = { ...userData, password: hashedPassword };
            // }

            const user = await this.userRepository.findById(id);
            if (user) {
                return await this.userRepository.save(userUpdateDto.toEntity(user));
            } else {
                throw new HttpException(400, "You're not userData");
            }
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

    public async createUsers(userCreateDtos: UserCreateDto[]): Promise<void> {
        try {
            const users: User[] = [];
            for (const userCreateDto of userCreateDtos) {
                users.push(userCreateDto.toEntity());
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
