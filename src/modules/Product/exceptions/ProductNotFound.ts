import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class ProductNotFoundException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Product not found!');
      this.statusCode = 404;
    };
};

export {ProductNotFoundException};