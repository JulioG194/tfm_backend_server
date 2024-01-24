import { type UserCredentialEntity } from './UserCredentialEntity'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

export class UserCredentialValue implements UserCredentialEntity {
  id: string;
  username: string
  password: string
  role?: string
  permissions?: string[]
  createdAt?: Date
  updatedAt?: Date

  constructor ({  username, password, role, permissions }: {
    username: string
    password: string
    role?: string
    permissions?: string[]
  }
  ) {
    this.id = uuidv4();
    this.username = username
    this.password = password
    this.role = role
    this.permissions = permissions
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static async verifyPassword (password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
  }
}
