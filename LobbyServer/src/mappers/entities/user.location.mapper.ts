import { UserLocation, Location } from '@interfaces/user-location.interface';
import { UserLocation as UserLocationEntity } from '@prisma/client';
import * as Entity from '@prisma/client';
import { DomainEntityMapper } from '@mappers/domain.entity.mapper'
import { LocationDetail, GameRoomLocationDetail, WaitingRoomLocationDetail } from '@interfaces/user-location.interface';

export class UserLocationMapper implements DomainEntityMapper<UserLocation, UserLocationEntity> {
    public toDomain(entity: UserLocationEntity): UserLocation {
        const location = this.toLocation(entity.location);
        const parsedDetail = JSON.parse(entity.locationDetail as string);

        let locationDetail: LocationDetail;

        if (parsedDetail.waitingRoomId !== undefined) {
            locationDetail = new WaitingRoomLocationDetail(
                location,
                parsedDetail.waitingRoomId,
                parsedDetail.matchmakingTicketId
            );
        } else if (parsedDetail.gameRoomId !== undefined) {
            locationDetail = new GameRoomLocationDetail(
                location,
                parsedDetail.gameRoomId
            );
        } else {
            locationDetail = new LocationDetail(location);
        }

        return {
            id: entity.id,
            location: location,
            locationDetail: locationDetail,
            timestamp: entity.timestamp,
        };
    }

    public toEntity(domain: UserLocation): UserLocationEntity {
        const location = this.toLocationEntity(domain.location);
        return {
            id: domain.id,
            location: location,
            locationDetail: JSON.stringify(domain.locationDetail),
            timestamp: domain.timestamp,
        };
    }

    public toDomains(entities: Iterable<UserLocationEntity>): Iterable<UserLocation> {
        return Array.from(entities, (entity) => this.toDomain(entity));
    }

    public toEntities(domains: Iterable<UserLocation>): Iterable<UserLocationEntity> {
        return Array.from(domains, (domain) => this.toEntity(domain));
    }

    public getEntityFieldName<K extends keyof UserLocation>(field: K): string {
        switch (field) {
            case 'id':
                return 'id';
            case 'location':
                return 'location';
            case 'locationDetail':
                return 'locationDetail';
            case 'timestamp':
                return 'timestamp';
            default:
                throw new Error(`Invalid field: ${field}`);
        }
    }

    public toEntityValue<K extends keyof UserLocation>(field: K, value: UserLocation[K]): any {
        switch (field) {
            case 'id':
                return value;
            case 'location':
                return this.toLocationEntity(value as Location);
            case 'locationDetail':
                return JSON.stringify(value);
            case 'timestamp':
                return value;
            default:
                throw new Error(`Invalid field: ${field}`);
        }
    }

    private toLocation(entitylocation: Entity.Location): Location {
        switch (entitylocation) {
            case Entity.Location.WaitingRoom:
                return Location.WaitingRoom;
            case Entity.Location.GameRoom:
                return Location.GameRoom;
            default:
                return Location.None;
        }
    }

    private toLocationEntity(location: Location): Entity.Location {
        switch (location) {
            case Location.WaitingRoom:
                return Entity.Location.WaitingRoom;
            case Location.GameRoom:
                return Entity.Location.GameRoom;
            default:
                return Entity.Location.None;
        }
    }
}
