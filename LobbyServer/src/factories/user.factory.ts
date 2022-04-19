import { User } from '@interfaces/user.interface';
import { Location } from "@interfaces/user.location.interface";

export class UserFactory {
    public static create(properties?: Partial<User>): User {
        return { ...UserFactory.createDefault(), ...properties };
    }

    private static createDefault(): User {
        return {
            id: '',
            nickname: '',
            masterExp: 0,
            friendlyRating: 1500,
            rankRating: 1500,
            goldCoin: 100,
            gem: 10,
            location: Location.Unknown,
            locationDetail: {
                location: Location.Unknown,
            }
        };
    }
}
