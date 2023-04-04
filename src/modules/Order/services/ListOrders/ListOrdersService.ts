
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListOrdersService {
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) { }
    async execute(): Promise<Order[]> {
        const orders = await this.ordersRepository.list();
        return orders;
    };
};

export { ListOrdersService };