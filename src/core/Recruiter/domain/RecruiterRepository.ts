import { RecruiterEntity } from './RecruiterEntity';
import { RecruiterValue } from './RecruiterValue';

export interface RecruiterRepository {
  register(recruiter: RecruiterValue): Promise<RecruiterValue>;
  findById(id: string): Promise<RecruiterValue | null>;
  findAll(): Promise<RecruiterEntity[]>;
  update(recruiter: RecruiterEntity): Promise<RecruiterValue>;
  delete(id: string): Promise<void>;
  searchByEmail(email: string): Promise<RecruiterValue | null>;
}