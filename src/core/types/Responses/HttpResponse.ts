import { HttpStatusCode } from "../HttpStatusCode";

export class HttpResponse {
    public readonly message: string;
    public readonly status: HttpStatusCode;
    public readonly data: Object | null;
    
    constructor(message: string, status: HttpStatusCode, data: Object | null) {
    
      this.status = status;
      this.message = message;
      this.data = data;

    }
}