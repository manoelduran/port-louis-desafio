import { DeleteOrderDTO } from "@modules/Order/dtos/DeleteOrderDTO";
import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteOrderService {
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) { }
    async execute({ id }: DeleteOrderDTO): Promise<OrderNotFoundException | void> {
        const orderExists = await this.ordersRepository.findById(id);
        if (!orderExists) {
            throw new OrderNotFoundException();
        };
        await this.ordersRepository.delete(id);
    };
};

export { DeleteOrderService };