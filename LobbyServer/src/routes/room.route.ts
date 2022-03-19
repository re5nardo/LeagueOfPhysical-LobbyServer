import { Router } from 'express';
import RoomController from '@controllers/room.controller';
import { Routes } from '@interfaces/routes.interface';

class RoomRoute implements Routes {
  public path = '/room';
  public router = Router();
  public roomController = new RoomController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.roomController.getRooms);
    this.router.get(`${this.path}/:id`, this.roomController.getRoomById);
  }
}

export default RoomRoute;
