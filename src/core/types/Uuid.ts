import { v4 as uuid } from "uuid";
import validate from "uuid-validate";

export class Uuid {
    constructor(value: string) {
      this.ensureIsValidUuid(value);
    }
  
    static random(): Uuid {
      return new Uuid(uuid());
    }
  
    private ensureIsValidUuid(id: string): void {
      if (!validate(id)) {
        throw new Error(
          `${id} is not a valid UUID`
        );
      }
    }
  }