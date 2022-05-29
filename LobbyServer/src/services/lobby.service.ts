
import { HttpException } from '@exceptions/HttpException';
import { Room } from '@interfaces/room.interface';
import roomModel from '@models/room.model';
import RoomController from '@src/controllers/room.controller';
import { isEmpty } from '@utils/util';

class LobbyService {
    public async joinLobby(userId: string): Promise<void> {
    }

    public async leaveLobby(userId: string): Promise<void> {
    }
}

export default LobbyService;
