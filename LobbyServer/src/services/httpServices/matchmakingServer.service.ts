import axios from 'axios';
import { MatchmakingTicket } from '@interfaces/matchmakingTicket.interface';
import { WaitingRoom } from '@interfaces/waitingRoom.interface';
import HttpService from '@services/httpServices/httpService';
import { MATCH_MAKING_SERVER_HOST, MATCH_MAKING_SERVER_PORT } from '@config';

class MtchmakingServerService extends HttpService {
    constructor() {
        if (!MATCH_MAKING_SERVER_HOST || !MATCH_MAKING_SERVER_PORT) {
            throw new Error(`MATCH_MAKING_SERVER_HOST: ${MATCH_MAKING_SERVER_HOST}, MATCH_MAKING_SERVER_PORT: ${MATCH_MAKING_SERVER_PORT}`);
        }
        super(MATCH_MAKING_SERVER_HOST, Number(MATCH_MAKING_SERVER_PORT));
    }

    public async findMatchmakingTicketById(matchmakingTicketId: string): Promise<MatchmakingTicket | undefined> {
        try {
            const url = `http://${this.host}:${this.port}/matchmaking-ticket/${matchmakingTicketId}`;
            const response = await axios.get(url);
            return response.data.matchmakingTicket;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async findWaitingRoomById(waitingRoomId: string): Promise<WaitingRoom | undefined> {
        try {
            const url = `http://${this.host}:${this.port}/waitingroom/${waitingRoomId}`;
            const response = await axios.get(url);
            return response.data.waitingRoom;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export default MtchmakingServerService;
