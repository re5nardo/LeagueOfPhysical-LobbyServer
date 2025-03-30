
export interface User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    lastLoginAt: Date | null;
}
