import { CreateUserDto, CreateUserResponseDto, UpdateUserLocationDto, VerifyUserLocationResponseDto, UpdateUserLocationResponseDto, GetUserResponseDto, FindAllUsersResponseDto, UserResponseDto } from '@dtos/user.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/user.interface';
import { isEmpty } from '@utils/util';
import { UserRepository } from '@repositories/user.repository';
import { GameRoomLocationDetail, Location, WaitingRoomLocationDetail } from '@interfaces/user.location.interface';
import WaitingRoomService from '@services/waitingRoom.service';
import RoomService from '@services/room.service';
import MatchmakingTicketService from '@services/matchmakingTicket.service';
import { ResponseCode } from '@interfaces/responseCode.interface';

class UserService {

    private userRepository = new UserRepository();
    private waitingRoomService = new WaitingRoomService();
    private roomService = new RoomService();
    private matchmakingTicketService = new MatchmakingTicketService();

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
                user: await this.userRepository.save(createUserDto.toEntity())
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async verifyUserLocation(userId: string): Promise<VerifyUserLocationResponseDto> {
        try {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                return {
                    code: ResponseCode.USER_NOT_EXIST
                };
            }

            switch (+user.location) {
                case Location.Unknown:
                    user.location = Location.Unknown;
                    user.locationDetail = {
                        location: Location.Unknown
                    }
                    break;

                case Location.InWaitingRoom:
                    const waitingRoomLocationDetail = user.locationDetail as WaitingRoomLocationDetail;
                    const waitingRoom = await this.waitingRoomService.findWaitingRoomById(waitingRoomLocationDetail.waitingRoomId);
                    if (!waitingRoom) {
                        user.location = Location.Unknown;
                        user.locationDetail = {
                            location: Location.Unknown
                        }
                    } else {
                        const matchmakingTicket = await this.matchmakingTicketService.findMatchmakingTicketById(waitingRoomLocationDetail.matchmakingTicketId);
                        if (!matchmakingTicket || waitingRoom.matchmakingTicketList.includes(waitingRoomLocationDetail.matchmakingTicketId) === false) {
                            user.location = Location.Unknown;
                            user.locationDetail = {
                                location: Location.Unknown
                            }
                        }
                    }
                    break;

                case Location.InGameRoom:
                    const gameRoomLocationDetail = user.locationDetail as GameRoomLocationDetail;
                    const getRoomResponseDto = await this.roomService.findRoomById(gameRoomLocationDetail.gameRoomId);
                    if (!getRoomResponseDto.room) {
                        user.location = Location.Unknown;
                        user.locationDetail = {
                            location: Location.Unknown
                        }
                    }
                    break;
            }
            return {
                code: ResponseCode.SUCCESS,
                user: await this.userRepository.save(user)
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async updateUserLocation(updateUserLocationDto: UpdateUserLocationDto): Promise<UpdateUserLocationResponseDto> {
        try {
            const userIds = updateUserLocationDto.userLocations.map(userLocation => userLocation.userId);
            const users = await this.userRepository.findAllById(userIds);
            for (const user of users) {
                const userLocationDto = updateUserLocationDto.userLocations.find(userLocation => userLocation.userId == user.id);
                if (userLocationDto) {
                    user.location = userLocationDto.location;
                    user.locationDetail = userLocationDto.locationDetail;
                }
            }

            await this.userRepository.saveAll(users);
            const savedUsers = await this.userRepository.findAllById(userIds);

            return {
                code: ResponseCode.SUCCESS,
                users: Array.from(savedUsers).map<UserResponseDto>(user => UserResponseDto.from(user))
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
                users.push(createUserDto.toEntity());
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
