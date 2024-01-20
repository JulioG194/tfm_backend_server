import { UserCredentialEntity } from './UserCredentialEntity';

export interface UserCredentialRepository {
  register(userCredential: UserCredentialEntity): Promise<void>;
}