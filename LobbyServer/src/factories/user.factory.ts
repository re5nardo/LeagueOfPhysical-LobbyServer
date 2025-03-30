import { User } from '@interfaces/user.interface';

export class UserFactory {
    public static create(properties?: Partial<User>): User {
        return { ...UserFactory.createDefault(), ...properties };
    }

    private static createDefault(): User {
        return {
            id: '',
            username: '',
            email: '',
            passwordHash: '',
            lastLoginAt: null,
        };
    }
}
