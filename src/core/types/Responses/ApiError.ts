import { HttpStatusCode } from "../HttpStatusCode";
import { BaseError } from "./BaseError";

export class APIError extends BaseError {
    constructor(name = '', httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
      super(name, httpCode, description, isOperational );
    }
}