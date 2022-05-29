import { NextFunction, Request, Response } from 'express';
import LobbyService from '@services/lobby.service';
import { LobbyJoinResponseDto, LobbyLeaveResponseDto } from '@dtos/lobby.dto';
import { ResponseCode } from '@interfaces/responseCode.interface';

class LobbyController {
    private lobbyService = new LobbyService();
    
    public joinLobby = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            await this.lobbyService.joinLobby(userId);
            const response: LobbyJoinResponseDto = {
                code: ResponseCode.SUCCESS
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
    
    public leaveLobby = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            await this.lobbyService.leaveLobby(userId);
            const response: LobbyLeaveResponseDto = {
                code: ResponseCode.SUCCESS
            };
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default LobbyController;
