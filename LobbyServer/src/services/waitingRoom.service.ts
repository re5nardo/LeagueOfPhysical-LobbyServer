import { WaitingRoom } from '@interfaces/waitingRoom.interface';
import MatchmakingServerService from '@services/httpServices/matchmakingServer.service';

class WaitingRoomService {

    private matchmakingServerService = new MatchmakingServerService();

    public async findWaitingRoomById(waitingRoomId: string): Promise<WaitingRoom | undefined> {
        try {
            return await this.matchmakingServerService.findWaitingRoomById(waitingRoomId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default WaitingRoomService;
