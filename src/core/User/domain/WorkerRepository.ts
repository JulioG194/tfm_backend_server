import { WorkerEntity } from './WorkerEntity';
import { WorkerValue } from './WorkerValue';

export interface WorkerRepository {
  register(worker: WorkerValue): Promise<void>;
  findByEmail(id: string): Promise<WorkerEntity | null>;
  findAll(): Promise<WorkerEntity[]>;
  update(worker: WorkerEntity): Promise<void>;
  delete(id: string): Promise<void>;
}