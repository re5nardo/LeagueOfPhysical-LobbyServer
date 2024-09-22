import { UserLocation } from '@interfaces/user-location.interface';
import { Location } from "@interfaces/user-location.interface";

export class UserLocationFactory {
    public static create(properties?: Partial<UserLocation>): UserLocation {
        return { ...UserLocationFactory.createDefault(), ...properties };
    }

    private static createDefault(): UserLocation {
        return {
            id: '',
            location: Location.None,
            locationDetail: {
                location: Location.None,
            },
            timestamp: Date.now(),
        };
    }
}
