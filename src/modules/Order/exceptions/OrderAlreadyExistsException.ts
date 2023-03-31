import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class OrderAlreadyExistsException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Order already exists!');
      this.statusCode = 400;
    };
};

export {OrderAlreadyExistsException};