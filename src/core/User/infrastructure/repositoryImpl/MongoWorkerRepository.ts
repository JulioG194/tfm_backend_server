import { WorkerValue } from '../../domain/WorkerValue'
import { WorkerEntity } from '../../domain/WorkerEntity'
import { WorkerRepository } from '../../domain/WorkerRepository'
import WorkerSchema from '../model/WorkerSchema'
import UserCredentialSchema from '../../../UserCredential/infrastructure/model/UserCredentialSchema'

export class MongoWorkerRepository implements WorkerRepository {
  async findByEmail(email: string): Promise<WorkerEntity | null> {
    try {
      const workerResp = await WorkerSchema.findOne({ email }).exec();
      console.log('worker', workerResp);
    if (!workerResp) {
        throw new Error('Usuario no encontrado');
    }
      const worker  = {id: workerResp.id, 
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
                                 sex: workerResp.sex ?? ''};
        return worker;
    } catch (error) {
      console.log('error', error);
      if (error instanceof Error) {
        throw new Error('Error registering worker: ' + error.message)
      } else {
        throw new Error('Unknown error while registering worker')
      }
    }
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
  async register (workerInput: WorkerValue): Promise<void> {
    try {
      console.log('workerInput', workerInput);
      const worker = await UserCredentialSchema.findOne({ username: workerInput.email }).exec();
      console.log('worker', worker);
    if (!worker) {
        throw new Error('Usuario no encontrado');
    }
      await WorkerSchema.create(workerInput)
    } catch (error) {
      console.log('error', error);
      if (error instanceof Error) {
        throw new Error('Error registering worker: ' + error.message)
      } else {
        throw new Error('Unknown error while registering worker')
      }
    }
  }
}