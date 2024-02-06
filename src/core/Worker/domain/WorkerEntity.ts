import { JobEntity } from "../../Job/domain/JobEntity";
import { PersonEntity } from "../../shared/entities/PersonEntity";

export interface WorkerEntity extends PersonEntity {
    jobs?: JobEntity[];
}