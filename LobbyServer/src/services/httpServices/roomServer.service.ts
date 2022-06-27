import axios from 'axios';
import { Room } from '@interfaces/room.interface';
import HttpService from '@services/httpServices/httpService';
import { ROOM_SERVER_HOST, ROOM_SERVER_PORT } from '@config';

class RoomServerService extends HttpService {
    constructor() {
        if (!ROOM_SERVER_HOST || !ROOM_SERVER_PORT) {
            throw new Error(`ROOM_SERVER_HOST: ${ROOM_SERVER_HOST}, ROOM_SERVER_PORT: ${ROOM_SERVER_PORT}`);
        }
        super(ROOM_SERVER_HOST, Number(ROOM_SERVER_PORT));
    }

    public async findRoomById(roomId: string): Promise<Room | undefined> {
        try {
            const url = `http://${this.host}:${this.port}/room/${roomId}`;
            const response = await axios.get(url);
            return response.data.room;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default RoomServerService;
