import { RecruiterValue } from '../../domain/RecruiterValue'
import { RecruiterEntity } from '../../domain/RecruiterEntity'
import { RecruiterRepository } from '../../domain/RecruiterRepository'
import { BaseError } from '../../../types/Responses/BaseError'
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { PersonBuilder } from '../../../utils/PersonBuilder'
import RecruiterSchema from '../model/RecruiterSchema'
import UserCredentialSchema from '../../../UserCredential/infrastructure/model/UserCredentialSchema'

export class MongoRecruiterRepository implements RecruiterRepository {

  private async findRecruiter(query: any): Promise<RecruiterEntity | null> {
    try {
      console.log('query', query)
      const recruiterResp = await RecruiterSchema.findOne(query).exec();
      if (!recruiterResp) throw new BaseError('Error al obtener información, usuario no encontrado', 
                                          HttpStatusCode.NOT_FOUND,
                                          'Recruiter not found', 
                                          true);

    const recruiter  = PersonBuilder(recruiterResp);
    return recruiter;
    } catch (error) {
      console.error('Error finding Recruiter:', error);
      throw error;
    }
  }
  
  async findById(id: string): Promise<RecruiterEntity | null> {
    console.log('email', id);
    return this.findRecruiter({ id });
  }

  async register (RecruiterInput: RecruiterValue): Promise<RecruiterValue> {
    const userCred = await UserCredentialSchema.findOne({ username: RecruiterInput.email }).exec();

    if (!userCred) throw new BaseError('Error al actualizar información, usuario no encontrado', 
                                        HttpStatusCode.BAD_REQUEST,
                                        'user not found', 
                                        true);

    const recruiterInfo = await RecruiterSchema.create(RecruiterInput)
    const recruiter  = PersonBuilder(recruiterInfo);
    return recruiter;
  }

  async searchByEmail(email: string): Promise<RecruiterValue | null> {
    return this.findRecruiter({ email });
  }

  findAll(): Promise<RecruiterEntity[]> {
      throw new Error('Method not implemented.')
  }

  async update(RecruiterInput: RecruiterEntity): Promise<void> {
    const userCred = await UserCredentialSchema.findOne({ email: RecruiterInput.email }).exec();

    if (!userCred) throw new BaseError('Error al actualizar información, usuario no encontrado', 
                                        HttpStatusCode.BAD_REQUEST,
                                        'user not found', 
                                        true);

    const recruiterInfo = await RecruiterSchema.findOneAndUpdate({ email: RecruiterInput.email}, 
                                                            { ...RecruiterInput }, 
                                                            { new: true })
    const recruiter  = PersonBuilder(recruiterInfo);
    return recruiter;
  }

  delete(id: string): Promise<void> {
      throw new Error('Method not implemented.')
  }

  

}