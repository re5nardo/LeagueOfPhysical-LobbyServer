import { UserProfile } from '@interfaces/user-profile.interface';

export class UserProfileFactory {
    public static create(properties?: Partial<UserProfile>): UserProfile {
        return { ...UserProfileFactory.createDefault(), ...properties };
    }

    private static createDefault(): UserProfile {
        return {
            id: '',
            nickname: undefined,
            avatarUrl: undefined,
            bio: undefined,
            userId: '',
        };
    }
}
