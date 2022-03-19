
export enum MatchType {
    Friendly = 0,
    Rank = 1,
}

interface MatchSetting {
    matchType: MatchType;
    subGameId: string;
    mapId: string;
}

export interface Room {
    matchId: string;
    expectedPlayerList: string[];
    matchSetting: MatchSetting;
    ip: string;
    port: number;
}
