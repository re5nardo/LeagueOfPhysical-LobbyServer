import { ResponseBase } from '@interfaces/responseBase.interface';
import { MatchType } from '@interfaces/match.interface';

export class RoomResponseDto {
    public id: string;
    public matchId: string;
    public matchType: MatchType;
    public subGameId: string;
    public mapId: string;
}

export class GetRoomResponseDto implements ResponseBase {
    public code: number;
    public room?: RoomResponseDto;
}
