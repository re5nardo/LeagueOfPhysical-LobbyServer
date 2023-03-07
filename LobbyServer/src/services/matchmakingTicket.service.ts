import { MatchmakingTicket } from '@interfaces/matchmakingTicket.interface';
import MatchmakingServerService from '@services/httpServices/matchmakingServer.service';

class MatchmakingTicketService {

    private matchmakingServerService = new MatchmakingServerService();

    public async findMatchmakingTicketById(matchmakingTicketId: string): Promise<MatchmakingTicket | undefined> {
        try {
            return await this.matchmakingServerService.findMatchmakingTicketById(matchmakingTicketId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default MatchmakingTicketService;

