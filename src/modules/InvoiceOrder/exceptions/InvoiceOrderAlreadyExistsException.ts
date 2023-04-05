import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class InvoiceOrderAlreadyExistsException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Association between Invoice and this order already exists!');
      this.statusCode = 400;
    };
};

export {InvoiceOrderAlreadyExistsException};