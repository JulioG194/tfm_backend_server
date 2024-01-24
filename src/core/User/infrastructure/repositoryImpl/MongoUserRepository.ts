import { DatabaseError } from '../../../types/Responses/DatabaseError'
import { UserValue } from '../../domain/UserValue'
import { UserEntity } from '../../domain/UserEntity'
import { UserRepository } from '../../domain/UserRepository'
import UserSchema from '../model/UserSchema'
import UserCredentialSchema from '../../../UserCredential/infrastructure/model/UserCredentialSchema'

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const userResp = await UserSchema.findOne({ email }).exec();
      console.log('user', userResp);
    if (!userResp) {
        throw new Error('Usuario no encontrado');
    }
      const user  = {id: userResp.id, 
                                  email: userResp.email, 
                                  name: userResp.name ?? '', 
                                  surname: userResp.surname ?? '', 
                                  address: userResp.address ?? '',
                                  city: userResp.city ?? '',
                                  description: userResp.description ?? '',
                                  employment: userResp.employment ?? '',
                                  phoneNumber: userResp.phoneNumber ?? '',
                                 province: userResp.province ?? '',
                                 postalCode: userResp.postalCode ?? '',
                                 sex: userResp.sex ?? ''};
        return user;
    } catch (error) {
      console.log('error', error);
      if (error instanceof Error) {
        throw new DatabaseError('Error registering user: ' + error.message)
      } else {
        throw new DatabaseError('Unknown error while registering user')
      }
    }
  }
  findAll(): Promise<UserEntity[]> {
      throw new Error('Method not implemented.')
  }
  update(user: UserEntity): Promise<void> {
      throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
      throw new Error('Method not implemented.')
  }
  async register (userInput: UserValue): Promise<void> {
    try {
      console.log('userInput', userInput);
      const user = await UserCredentialSchema.findOne({ username: userInput.email }).exec();
      console.log('user', user);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
      await UserSchema.create(userInput)
    } catch (error) {
      console.log('error', error);
      if (error instanceof Error) {
        throw new DatabaseError('Error registering user: ' + error.message)
      } else {
        throw new DatabaseError('Unknown error while registering user')
      }
    }
  }
}