import { ResponseBase } from '@interfaces/responseBase.interface';
import { RoomStatus } from '@interfaces/room.interface';

export class RoomResponseDto {
    public id: string;
    public matchId: string;
    public status: RoomStatus;
    public ip: string;
    public port: number;
}

export class GetRoomResponseDto implements ResponseBase {
    public code: number;
    public room?: RoomResponseDto;
}
