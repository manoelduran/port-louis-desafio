import { ShowOrderProductDTO } from "@modules/OrderProduct/dtos/ShowOrderProductDTO";
import { OrderProductNotFoundException } from "@modules/OrderProduct/exceptions/OrderProductNotFoundException";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ShowOrderProductsService {
    constructor(
        @inject("OrderProductsRepository")
        private orderProductsRepository: IOrderProductsRepository
    ) { }
    async execute({ item_number }: ShowOrderProductDTO): Promise<OrderProductNotFoundException | OrderProduct> {
        const orderProductExists = await this.orderProductsRepository.findByItemNumber(item_number);
        if (!orderProductExists) {
            throw new OrderProductNotFoundException();
        };
        return orderProductExists;
    };
};

export { ShowOrderProductsService };