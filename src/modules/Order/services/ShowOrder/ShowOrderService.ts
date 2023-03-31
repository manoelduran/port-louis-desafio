import { ShowOrderDTO } from "@modules/Order/dtos/ShowOrderDTO";
import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ShowOrderService {
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) { }
    async execute({ id }: ShowOrderDTO): Promise<OrderNotFoundException | Order> {
        const orderExists = await this.ordersRepository.findById(id);
        if (!orderExists) {
            throw new OrderNotFoundException();
        };
        return orderExists;
    };
};

export { ShowOrderService };