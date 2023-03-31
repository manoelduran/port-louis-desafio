import { BaseException } from "@shared/domain/BaseException";

class InvoiceNotFoundException extends Error implements BaseException {
    public statusCode: number;

    constructor() {
      super('Invoice not found!');
      this.name = 'InvoiceNotFoundException';
      this.statusCode = 404;
    };
};

export {InvoiceNotFoundException};