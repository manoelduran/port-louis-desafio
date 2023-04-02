import { BaseException } from "@shared/domain/BaseException";
import AppError from "@shared/errors/AppError";

class ItemNumberNeedBeUniqueException extends AppError implements BaseException {
    public statusCode: number;

    constructor() {
      super('Item number needs to be unique!');
      this.statusCode = 405;
    };
};

export {ItemNumberNeedBeUniqueException};