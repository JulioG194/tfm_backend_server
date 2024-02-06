import { WorkerValue } from '../../domain/WorkerValue'
import { WorkerEntity } from '../../domain/WorkerEntity'
import { WorkerRepository } from '../../domain/WorkerRepository'
import { BaseError } from '../../../types/Responses/BaseError'
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { PersonBuilder } from '../../../utils/PersonBuilder'
import WorkerSchema from '../model/WorkerSchema'
import UserCredentialSchema from '../../../UserCredential/infrastructure/model/UserCredentialSchema'
import { JobEntity } from '../../../Job/domain/JobEntity';
import { JobValue } from '../../../Job/domain/JobValue';
import JobSchema from '../../../Job/infrastructure/model/JobSchema';

export class MongoWorkerRepository implements WorkerRepository {

  private async findWorker(query: any): Promise<WorkerEntity | null> {
    try {
      const workerResp = await WorkerSchema.findOne(query).exec();
      if (!workerResp) throw new BaseError('Error al obtener información, usuario no encontrado', 
                                          HttpStatusCode.NOT_FOUND,
                                          'worker not found', 
                                          true);

    const worker  = PersonBuilder(workerResp);
    return worker;
    } catch (error) {
      console.error('Error finding worker:', error);
      throw error;
    }
  }
  
  async findById(id: string): Promise<WorkerEntity | null> {
    return this.findWorker({ id });
  }

  async register (workerInput: WorkerValue): Promise<WorkerValue> {
    const userCred = await UserCredentialSchema.findOne({ username: workerInput.email }).exec();

    if (!userCred) throw new BaseError('Error al actualizar información, usuario no encontrado', 
                                        HttpStatusCode.BAD_REQUEST,
                                        'user not found', 
                                        true);

    const workerInfo = await WorkerSchema.create(workerInput)
    const worker  = PersonBuilder(workerInfo);
    return worker;
  }

  async searchByEmail(email: string): Promise<WorkerEntity | null> {
    let workerFound = await  WorkerSchema.findOne({ email }).populate('jobs');;

    if (!workerFound) throw new BaseError('Error al obtener información, usuario no encontrado', 
                                          HttpStatusCode.NOT_FOUND,
                                          'worker not found', 
                                          true);

    const worker  = PersonBuilder(workerFound);
    return worker;
  }

  async findAll(): Promise<WorkerEntity[]> {
      const workersInfo = await WorkerSchema.find();
      const workers = workersInfo.map(worker => PersonBuilder(worker));
      return workers;
  }

  async update(workerInput: WorkerEntity): Promise<WorkerValue> {

    const workerInfo = await WorkerSchema.findOneAndUpdate({ email: workerInput.email}, 
                                                            { ...workerInput }, 
                                                            { new: true })

    console.log('w', workerInfo);

    if (!workerInfo) throw new BaseError('Error al actualizar información, usuario no encontrado', 
                                                            HttpStatusCode.BAD_REQUEST,
                                                            'user not found', 
                                                            true);

    const worker  = PersonBuilder(workerInfo);
    return worker;
  }

  delete(id: string): Promise<void> {
      throw new Error('Method not implemented.')
  }

  async addJobs(email: string, jobs: JobEntity[]): Promise<WorkerEntity> {
    const worker = await this.findWorker({email});
    if (!worker) throw new BaseError('Error al obtener información, usuario no encontrado', 
                                          HttpStatusCode.NOT_FOUND,
                                          'worker not found', 
                                          true);

    const jobIds = [];
      for (const jobData of jobs) {
            const job = new JobValue(jobData);
            const jobAdded = await JobSchema.create(job);
            jobIds.push(jobAdded._id);
    }

    const workerUpdated = await WorkerSchema.findOneAndUpdate(
      { email },
      { $push: { jobs: { $each: jobIds } } },
      { new: true }
    );

    const workerData  = PersonBuilder(workerUpdated);
    return workerData;

  }

  

}