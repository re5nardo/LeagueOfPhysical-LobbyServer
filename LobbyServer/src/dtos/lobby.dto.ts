import { IsNumber } from 'class-validator';
import { ResponseBase } from '@interfaces/responseBase.interface';

export class LobbyJoinResponseDto implements ResponseBase {
    public code: number;
}

export class LobbyLeaveResponseDto implements ResponseBase {
    public code: number;
}
