import { BaseException } from "@shared/domain/BaseException";

class OrderNotFoundException extends Error implements BaseException {
    public statusCode: number;

    constructor() {
      super('Order not found!');
      this.name = 'OrderNotFoundException';
      this.statusCode = 404;
    };
};

export {OrderNotFoundException};