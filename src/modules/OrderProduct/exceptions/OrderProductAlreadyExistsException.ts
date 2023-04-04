import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class OrderProductAlreadyExistsException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Association between Order and this product already exists!');
      this.statusCode = 400;
    };
};

export {OrderProductAlreadyExistsException};