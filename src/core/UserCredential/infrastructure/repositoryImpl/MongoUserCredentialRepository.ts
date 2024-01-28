import mongoose from 'mongoose'
import { type UserCredentialRepository } from '../../domain/UserCredentialRepository'
import { type UserCredentialValue } from '../../domain/UserCredentialValue'
import UserCredentialSchema from '../model/UserCredentialSchema'
import { logger } from '../../../shared/Logger'
import { BaseError } from '../../../types/Responses/BaseError'
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { WorkerValue } from '../../../Worker/domain/WorkerValue'
import { RecruiterValue } from '../../../Recruiter/domain/RecruiterValue'
import WorkerSchema from '../../../Worker/infrastructure/model/WorkerSchema'
import RecruiterSchema from '../../../Recruiter/infrastructure/model/RecruiterSchema'
import { PersonBuilder } from '../../../utils/PersonBuilder'


export class MongoUserCredentialRepository implements UserCredentialRepository {
  async register (userCredential: UserCredentialValue): Promise<void> {
    try {
      const userCredRegister = await UserCredentialSchema.create(userCredential);
      const userProps = PersonBuilder(userCredRegister);
      
      if(userCredRegister.role === 'worker') {
      const user = new WorkerValue(userProps);
      await WorkerSchema.create(user);
      }
      if(userCredRegister.role === 'recruiter') {
        const user = new RecruiterValue(userProps);
        await RecruiterSchema.create(user);
      }
    } catch (error: any) {
      let validatorsErrors = '';
      let logValidatorsErrors = '';
      if (error instanceof mongoose.Error.ValidationError) {
        if(error.errors.username){
          validatorsErrors += error.errors.username.message;
          logValidatorsErrors += `Invalid username: ${userCredential.username}`;
        }
        if(error.errors.password){
          validatorsErrors += ', ' + error.errors.password.message
          logValidatorsErrors += ', ' + 'Invalid password characters longer';
        }
        logger.error('Validation error: ' + logValidatorsErrors);
        throw new BaseError(validatorsErrors, HttpStatusCode.BAD_REQUEST, 'Validation error ', true);
      }
       if (error.code === 11000) {
        logger.error('Duplicate key error: ' + `User: ${userCredential.username} already exists`);
        throw new BaseError('El usuario ya existe', HttpStatusCode.BAD_REQUEST, 'Duplicate key error ', true);
      }
    }
  }
}
