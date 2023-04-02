import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class InvoiceAlreadyExistsException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Invoice already exists!');
      this.statusCode = 400;
    };
};

export {InvoiceAlreadyExistsException};