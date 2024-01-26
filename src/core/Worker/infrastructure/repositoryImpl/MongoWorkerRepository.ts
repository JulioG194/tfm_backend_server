import { WorkerValue } from '../../domain/WorkerValue'
import { WorkerEntity } from '../../domain/WorkerEntity'
import { WorkerRepository } from '../../domain/WorkerRepository'
import WorkerSchema from '../model/WorkerSchema'
import UserCredentialSchema from '../../../UserCredential/infrastructure/model/UserCredentialSchema'
import { BaseError } from '../../../types/Responses/BaseError'
import { HttpStatusCode } from '../../../types/HttpStatusCode';

export class MongoWorkerRepository implements WorkerRepository {
  async findById(id: string): Promise<WorkerEntity | null> {
   // try {
      const workerResp = await WorkerSchema.findOne({ id }).exec();
      console.log('worker', workerResp);
    if (!workerResp) {
      throw new BaseError('Error al obtener información, usuario no encontrado', HttpStatusCode.NOT_FOUND,'worker not found', true);
    }
      const worker  = { id: workerResp.id, 
                        email: workerResp.email, 
                        name: workerResp.name ?? '', 
                        surname: workerResp.surname ?? '', 
                        address: workerResp.address ?? '',
                        city: workerResp.city ?? '',
                        description: workerResp.description ?? '',
                        employment: workerResp.employment ?? '',
                        phoneNumber: workerResp.phoneNumber ?? '',
                        province: workerResp.province ?? '',
                        postalCode: workerResp.postalCode ?? '',
                        sex: workerResp.sex ?? '',
                        avatar: workerResp.avatar ?? '',
                      };
        return worker;
   // } catch (error) {
    //  console.log('error', error);
     // throw new BaseError('Error al encontrar el trabajador', HttpStatusCode.BAD_REQUEST,'worker not found', true);
   // }
  }
  findAll(): Promise<WorkerEntity[]> {
      throw new Error('Method not implemented.')
  }
  update(worker: WorkerEntity): Promise<void> {
      throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
      throw new Error('Method not implemented.')
  }
  async register (workerInput: WorkerValue): Promise<WorkerValue> {
   // try {
      console.log('workerInput', workerInput);
      const userCred = await UserCredentialSchema.findOne({ username: workerInput.email }).exec();
      console.log('userCred', userCred);
    if (!userCred) {
        throw new BaseError('Error al actualizar información, usuario no encontrado', HttpStatusCode.BAD_REQUEST,'user not found', true);
      }
      const workerInfo = await WorkerSchema.create(workerInput)
      const worker  = { 
        id: workerInfo.id, 
        email: workerInfo.email, 
        name: workerInfo.name ?? '', 
        surname: workerInfo.surname ?? '', 
        address: workerInfo.address ?? '',
        city: workerInfo.city ?? '',
        description: workerInfo.description ?? '',
        employment: workerInfo.employment ?? '',
        phoneNumber: workerInfo.phoneNumber ?? '',
        province: workerInfo.province ?? '',
        postalCode: workerInfo.postalCode ?? '',
        sex: workerInfo.sex ?? '',
        avatar: workerInfo.avatar?? '',
      };
        return worker;
   // } catch (error) {
    //  throw new BaseError('Error al actualizar información de trabajador', HttpStatusCode.BAD_REQUEST,'register unsucessful', true);
    //}
  }
}