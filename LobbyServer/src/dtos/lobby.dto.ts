import { IsNumber } from 'class-validator';
import { ResponseBase } from '@interfaces/responseBase.interface';

export class JoinLobbyResponseDto implements ResponseBase {
    public code: number;
}

export class LeaveLobbyResponseDto implements ResponseBase {
    public code: number;
}
