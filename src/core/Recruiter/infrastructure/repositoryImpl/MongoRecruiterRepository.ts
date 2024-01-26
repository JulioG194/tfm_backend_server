import { RecruiterValue } from '../../domain/RecruiterValue'
import { RecruiterEntity } from '../../domain/RecruiterEntity'
import { RecruiterRepository } from '../../domain/RecruiterRepository'
import RecruiterSchema from '../model/RecruiterSchema'
import UserCredentialSchema from '../../../UserCredential/infrastructure/model/UserCredentialSchema'
import { BaseError } from '../../../types/Responses/BaseError'
import { HttpStatusCode } from '../../../types/HttpStatusCode';

export class MongoRecruiterRepository implements RecruiterRepository {
  async findById(id: string): Promise<RecruiterEntity | null> {
   // try {
      const recruiterResp = await RecruiterSchema.findOne({ id }).exec();
      console.log('Recruiter', recruiterResp);
    if (!recruiterResp) {
      throw new BaseError('Error al obtener información, usuario no encontrado', HttpStatusCode.NOT_FOUND,'Recruiter not found', true);
    }
      const recruiter  = { 
                        id: recruiterResp.id, 
                        email: recruiterResp.email, 
                        name: recruiterResp.name ?? '', 
                        surname: recruiterResp.surname ?? '', 
                        address: recruiterResp.address ?? '',
                        city: recruiterResp.city ?? '',
                        description: recruiterResp.description ?? '',
                        employment: recruiterResp.employment ?? '',
                        phoneNumber: recruiterResp.phoneNumber ?? '',
                        province: recruiterResp.province ?? '',
                        postalCode: recruiterResp.postalCode ?? '',
                        sex: recruiterResp.sex ?? '',
                        avatar: recruiterResp.avatar?? '',
                      };
        return recruiter;
  //  } catch (error) {
    //  console.log('error', error);
    //  throw new BaseError('Error al encontrar el trabajador', HttpStatusCode.BAD_REQUEST,'Recruiter not found', true);
    //}
  }
  findAll(): Promise<RecruiterEntity[]> {
      throw new Error('Method not implemented.')
  }
  update(Recruiter: RecruiterEntity): Promise<void> {
      throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
      throw new Error('Method not implemented.')
  }
  async register (recruiterInput: RecruiterValue): Promise<RecruiterValue> {
   // try {
      console.log('RecruiterInput', recruiterInput);
      const userCred = await UserCredentialSchema.findOne({ username: recruiterInput.email }).exec();
      console.log('userCred', userCred);
    if (!userCred) {
        throw new BaseError('Error al actualizar información, usuario no encontrado', HttpStatusCode.BAD_REQUEST,'user not found', true);
      }
      const recruiterInfo = await RecruiterSchema.create(recruiterInput)
      const recruiter  = { id: recruiterInfo.id, 
        email: recruiterInfo.email, 
        name: recruiterInfo.name ?? '', 
        surname: recruiterInfo.surname ?? '', 
        address: recruiterInfo.address ?? '',
        city: recruiterInfo.city ?? '',
        description: recruiterInfo.description ?? '',
        employment: recruiterInfo.employment ?? '',
        phoneNumber: recruiterInfo.phoneNumber ?? '',
        province: recruiterInfo.province ?? '',
        postalCode: recruiterInfo.postalCode ?? '',
        sex: recruiterInfo.sex ?? '',
        avatar: recruiterInfo.avatar ?? ''
      };
        return recruiter;
   // } catch (error) {
    //  throw new BaseError('Error al actualizar información de reclutador', HttpStatusCode.BAD_REQUEST,'register unsucessful', true);
    //}
  }
}