import { MatchmakingTicket } from '@interfaces/MatchmakingTicket.interface';
import MatchmakingServerService from '@services/httpServices/matchmakingServerService';

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

