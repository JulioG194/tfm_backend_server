export interface UserCredentialEntity {
    id?: string;
    username: string;
    password?: string;
    role?: string;
    permissions?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}