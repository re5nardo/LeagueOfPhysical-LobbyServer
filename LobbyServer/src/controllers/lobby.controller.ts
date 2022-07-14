import { NextFunction, Request, Response } from 'express';
import LobbyService from '@services/lobby.service';

class LobbyController {
    private lobbyService = new LobbyService();
    
    public joinLobby = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            const response = await this.lobbyService.joinLobby(userId);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
    
    public leaveLobby = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.id;
            const response = await this.lobbyService.leaveLobby(userId);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default LobbyController;
