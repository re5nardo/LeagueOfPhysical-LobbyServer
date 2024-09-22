import { UserLocation } from "@interfaces/user-location.interface";
import { UserLocationResponseDto } from "@dtos/user-location.dto";

export class UserLocationMapper {
    public static toUserLocationResponseDto(userLocation: UserLocation): UserLocationResponseDto {
        return {
            userId: userLocation.id,
            location: userLocation.location,
            locationDetail: userLocation.locationDetail,
            timestamp: userLocation.timestamp,
        };
    }
}
