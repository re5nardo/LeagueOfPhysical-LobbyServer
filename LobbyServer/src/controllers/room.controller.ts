import { NextFunction, Request, Response } from 'express';
import { Room } from '@interfaces/room.interface';
import RoomService from '@services/room.service';

class RoomController {
    private roomService = new RoomService();
    
    public getRooms = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllRoomsData: Room[] = await this.roomService.findAllRoom();
            
            res.status(200).json({ data: findAllRoomsData, message: 'findAll' }); //  BaseResponse?
        } catch (error) {
            next(error);
        }
    };
    
    public getRoomById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const roomId: string = req.params.id;
            const findOneRoomData: Room = await this.roomService.findRoomById(roomId);
            
            res.status(200).json({ data: findOneRoomData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };
}

export default RoomController;
