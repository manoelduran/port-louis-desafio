import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class OrderProductNotFoundException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Association beteween Order and this product not found!');
      this.statusCode = 404;
    };
};

export {OrderProductNotFoundException};