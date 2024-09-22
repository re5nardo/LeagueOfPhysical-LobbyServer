import { UpdateUserLocationDto, UpdateUserLocationResponseDto, GetUserLocationResponseDto, UserLocationResponseDto } from '@dtos/user-location.dto';
import { UserLocationRepository } from '@repositories/user-location.repository';
import { GameRoomLocationDetail, UserLocation, Location, WaitingRoomLocationDetail } from '@interfaces/user-location.interface';
import WaitingRoomService from '@services/waitingRoom.service';
import RoomService from '@services/room.service';
import MatchmakingTicketService from '@services/matchmakingTicket.service';
import { ResponseCode } from '@interfaces/responseCode.interface';
import { UserLocationMapper } from '@mappers/user-location.mapper';
import { RoomStatus } from '@interfaces/room.interface';
import { UserLocationFactory } from '@factories/user-location.factory';

class UserLocationService {

    private userLocationRepository = new UserLocationRepository();
    private waitingRoomService = new WaitingRoomService();
    private roomService = new RoomService();
    private matchmakingTicketService = new MatchmakingTicketService();

    public async getOrCreateUserLocationById(userId: string): Promise<GetUserLocationResponseDto> {
        try {
            let userLocation = await this.userLocationRepository.findById(userId);
            if (!userLocation) {
                userLocation = UserLocationFactory.create({
                    id: userId,
                });
                await this.userLocationRepository.save(userLocation);
            } else {
                userLocation = await this.verifyUserLocation(userLocation);
            }

            return {
                code: ResponseCode.SUCCESS,
                userLocation: UserLocationMapper.toUserLocationResponseDto(userLocation),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async updateUserLocation(updateUserLocationDto: UpdateUserLocationDto): Promise<UpdateUserLocationResponseDto> {
        try {
            const userIds = updateUserLocationDto.userLocations.map(userLocation => userLocation.userId);
            const userLocations = await this.userLocationRepository.findAllById(userIds);

            for (let userLocation of userLocations) {
                const userLocationDto = updateUserLocationDto.userLocations.find(userLocationDto => userLocationDto.userId == userLocation.id);
                if (userLocationDto) {
                    userLocation.location = userLocationDto.location;
                    userLocation.locationDetail = userLocationDto.locationDetail;
                    userLocation = await this.verifyUserLocation(userLocation);
                }
            }

            return {
                code: ResponseCode.SUCCESS,
                userLocations: Array.from(userLocations).map<UserLocationResponseDto>(userLocation => UserLocationMapper.toUserLocationResponseDto(userLocation)),
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    private async verifyUserLocation(userLocation: UserLocation): Promise<UserLocation> {
        try {
            switch (+userLocation.location) {
                case Location.WaitingRoom:
                    const waitingRoomLocationDetail = userLocation.locationDetail as WaitingRoomLocationDetail;
                    const waitingRoom = await this.waitingRoomService.findWaitingRoomById(waitingRoomLocationDetail.waitingRoomId);
                    if (!waitingRoom) {
                        userLocation.location = Location.None;
                        userLocation.locationDetail = {
                            location: Location.None
                        }
                    } else {
                        const matchmakingTicket = await this.matchmakingTicketService.findMatchmakingTicketById(waitingRoomLocationDetail.matchmakingTicketId);
                        if (!matchmakingTicket || waitingRoom.matchmakingTicketList.includes(waitingRoomLocationDetail.matchmakingTicketId) === false) {
                            userLocation.location = Location.None;
                            userLocation.locationDetail = {
                                location: Location.None
                            }
                        }
                    }
                    break;

                case Location.GameRoom:
                    const gameRoomLocationDetail = userLocation.locationDetail as GameRoomLocationDetail;
                    const getRoomResponseDto = await this.roomService.findRoomById(gameRoomLocationDetail.gameRoomId);
                    if (!getRoomResponseDto) {
                        userLocation.location = Location.None;
                        userLocation.locationDetail = {
                            location: Location.None
                        }
                    } else {
                        if (!getRoomResponseDto.room || getRoomResponseDto.room.status === RoomStatus.Closed || getRoomResponseDto.room.status === RoomStatus.Error) {
                            userLocation.location = Location.None;
                            userLocation.locationDetail = {
                                location: Location.None
                            }
                        }
                    }
                    break;
            }
            return await this.userLocationRepository.save(userLocation);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default UserLocationService;
