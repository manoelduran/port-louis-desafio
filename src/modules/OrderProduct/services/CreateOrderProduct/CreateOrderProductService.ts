

import { CreateOrderProductDTO } from "@modules/OrderProduct/dtos/CreateOrderProductDTO";
import { OrderProductAlreadyExistsException } from "@modules/OrderProduct/exceptions/OrderProductAlreadyExistsException";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateOrderProductService {
    constructor(
        @inject("OrderProductsRepository")
        private orderProductsRepository: IOrderProductsRepository
    ) { }
    async execute(data: CreateOrderProductDTO): Promise<OrderProductAlreadyExistsException | OrderProduct> {
        const orderProductsAlreadyExists = await this.orderProductsRepository.findByItemNumber(data.numero_item);

        if (orderProductsAlreadyExists instanceof OrderProduct) {
            throw new OrderProductAlreadyExistsException();
        };
        const newOrderProduct = await this.orderProductsRepository.create(data);

        return newOrderProduct;

    };
};

export { CreateOrderProductService };