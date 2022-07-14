import { JoinLobbyResponseDto, LeaveLobbyResponseDto } from '@dtos/lobby.dto';
import { ResponseCode } from '@interfaces/responseCode.interface';

class LobbyService {
    public async joinLobby(userId: string): Promise<JoinLobbyResponseDto> {
        return {
            code: ResponseCode.SUCCESS
        };
    }

    public async leaveLobby(userId: string): Promise<LeaveLobbyResponseDto> {
        return {
            code: ResponseCode.SUCCESS
        };
    }
}

export default LobbyService;
