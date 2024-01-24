import { UserEntity } from './UserEntity';
import { UserValue } from './UserValue';

export interface UserRepository {
  register(user: UserValue): Promise<void>;
  findByEmail(id: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(user: UserEntity): Promise<void>;
  delete(id: string): Promise<void>;
}