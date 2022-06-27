import { Room } from '@interfaces/room.interface';
import RoomServerService from '@services/httpServices/roomServer.service';

class RoomService {

    private roomServerService = new RoomServerService();

    public async findRoomById(roomId: string): Promise<Room | undefined> {
        try {
            return await this.roomServerService.findRoomById(roomId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default RoomService;
