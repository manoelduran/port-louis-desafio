import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class InvoiceOrderNotFoundException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Association beteween Invoice and this order not found!');
      this.statusCode = 404;
    };
};

export {InvoiceOrderNotFoundException};