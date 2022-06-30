import { GetRoomResponseDto } from '@dtos/room.dto';
import RoomServerService from '@services/httpServices/roomServer.service';

class RoomService {

    private roomServerService = new RoomServerService();

    public async findRoomById(roomId: string): Promise<GetRoomResponseDto> {
        try {
            return await this.roomServerService.findRoomById(roomId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default RoomService;
