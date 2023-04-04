import { DeleteOrderDTO } from "@modules/Order/dtos/DeleteOrderDTO";
import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { DeleteOrderProductDTO } from "@modules/OrderProduct/dtos/DeleteOrderProductDTO";
import { OrderProductNotFoundException } from "@modules/OrderProduct/exceptions/OrderProductNotFoundException";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteOrderProductService {
    constructor(
        @inject("OrderProductsRepository")
        private orderProductsRepository: IOrderProductsRepository
    ) { }
    async execute({ item_number }: DeleteOrderProductDTO): Promise<OrderProductNotFoundException | void> {
        const orderExists = await this.orderProductsRepository.findByItemNumber(item_number);
        if (!orderExists) {
            throw new OrderProductNotFoundException();
        };
        await this.orderProductsRepository.delete(item_number);
    };
};

export { DeleteOrderProductService };