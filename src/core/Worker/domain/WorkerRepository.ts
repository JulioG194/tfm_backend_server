import { WorkerEntity } from './WorkerEntity';
import { WorkerValue } from './WorkerValue';

export interface WorkerRepository {
  register(worker: WorkerValue): Promise<WorkerValue>;
  findById(id: string): Promise<WorkerValue | null>;
  findAll(): Promise<WorkerEntity[]>;
  update(worker: WorkerEntity): Promise<void>;
  delete(id: string): Promise<void>;
}