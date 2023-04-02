import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class OrderNotFoundException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Order not found!');
      this.statusCode = 404;
    };
};

export {OrderNotFoundException};