
import { CreateInvoiceDTO } from "@modules/Invoice/dtos/CreateInvoiceDTO";
import { CreateOrderDTO } from "@modules/Order/dtos/CreateOrderDTO";
import { ItemNumberNeedBeUniqueException } from "@modules/Order/exceptions/ItemNumberNeedBeUniqueException";
import { OrderAlreadyExistsException } from "@modules/Order/exceptions/OrderAlreadyExistsException";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateOrderService {
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) { }
    async execute(data: CreateOrderDTO): Promise<OrderAlreadyExistsException   |Order> {
        const orderAlreadyExists = await this.ordersRepository.findById(data.id);

        if (orderAlreadyExists instanceof Order) {
            throw new OrderAlreadyExistsException();
        };
        const newOrder = await this.ordersRepository.create(data);

        return newOrder;

    };
};

export { CreateOrderService };