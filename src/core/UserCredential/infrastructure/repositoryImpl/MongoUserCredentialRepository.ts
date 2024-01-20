import { DatabaseError } from '../../../types/Responses/DatabaseError'
import { type UserCredentialRepository } from '../../domain/UserCredentialRepository'
import { type UserCredentialValue } from '../../domain/UserCredentialValue'
import UserCredentialSchema from '../model/UserCredentialSchema'

export class MongoUserCredentialRepository implements UserCredentialRepository {
  async register (userCredential: UserCredentialValue): Promise<void> {
    try {
      await UserCredentialSchema.create(userCredential)
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError('Error registering user: ' + error.message)
      } else {
        throw new DatabaseError('Unknown error while registering user')
      }
    }
  }
}
