
import { HttpException } from '@exceptions/HttpException';
import { Room } from '@interfaces/room.interface';
import roomModel from '@models/room.model';
import { isEmpty } from '@utils/util';

class RoomService {
  public async findAllRoom(): Promise<Room[]> {
    const rooms: Room[] = await roomModel.find();
    return rooms;
  }

  public async findRoomById(roomId: string): Promise<Room> {
    if (isEmpty(roomId)) throw new HttpException(400, "You're not roomId");

    const findRoom = await roomModel.findOne({ _id: roomId });
    if (!findRoom) throw new HttpException(409, "You're not room");

    return findRoom;
  }
}

export default RoomService;
