import { BaseException } from "@shared/domain/BaseException";

class InvoiceAlreadyExistsException extends Error implements BaseException {
    public statusCode: number;

    constructor() {
      super('Invoice already exists!');
      this.name = 'InvoiceAlreadyExistsException';
      this.statusCode = 400;
    };
};

export {InvoiceAlreadyExistsException};