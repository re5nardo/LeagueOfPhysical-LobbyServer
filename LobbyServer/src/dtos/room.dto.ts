import { ResponseBase } from '@interfaces/responseBase.interface';
import { MatchType } from '@interfaces/match.interface';

export class RoomResponseDto {
    public id: string;
    public matchId: string;
    public matchType: MatchType;
    public subGameId: string;
    public mapId: string;
    public status: RoomStatus;
    public ip: string;
    public port: number;
}

export class GetRoomResponseDto implements ResponseBase {
    public code: number;
    public room?: RoomResponseDto;
}

export enum RoomStatus {
    None = 0,
    Spawning = 1,
    Spawned = 2,
    Ready = 3,
    Playing = 4,
    Finished = 5,
}
