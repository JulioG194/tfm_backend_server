import { HttpStatusCode } from "../HttpStatusCode";
import { BaseError } from "./BaseError";

export class HttpResponse {
    public readonly message: string;
    public readonly status: HttpStatusCode;
    public readonly data: Object | null;
    //public readonly error: BaseError | null;
    
    constructor(message: string, status: HttpStatusCode, data: Object | null) {
    
      this.status = status;
      this.message = message;
      this.data = data;

    }
}