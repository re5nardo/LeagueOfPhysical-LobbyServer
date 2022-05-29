import { Router } from 'express';
import LobbyController from '@controllers/lobby.controller';
import { Routes } from '@interfaces/routes.interface';

class LobbyRoute implements Routes {
    public path = '/lobby';
    public router = Router();
    public lobbyController = new LobbyController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.put(`${this.path}/join/:id`, this.lobbyController.joinLobby);
        this.router.put(`${this.path}/leave/:id`, this.lobbyController.leaveLobby);
    }
}

export default LobbyRoute;
