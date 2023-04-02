import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class ProductAlreadyExistsException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Product already exists!');
      this.statusCode = 400;
    };
};

export {ProductAlreadyExistsException};