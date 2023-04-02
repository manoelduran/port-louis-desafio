import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class InvoiceNotFoundException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Invoice not found!');
      this.statusCode = 404;
    };
};

export {InvoiceNotFoundException};