import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListOrderProductsService {
    constructor(
        @inject("OrderProductsRepository")
        private orderProductsRepository: IOrderProductsRepository
    ) { }
    async execute(): Promise<OrderProduct[]> {
        const orderProducts = await this.orderProductsRepository.list();
        return orderProducts;
    };
};

export { ListOrderProductsService };