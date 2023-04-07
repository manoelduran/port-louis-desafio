

import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { CreateOrderProductDTO } from "@modules/OrderProduct/dtos/CreateOrderProductDTO";
import { OrderProductAlreadyExistsException } from "@modules/OrderProduct/exceptions/OrderProductAlreadyExistsException";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { ProductNotFoundException } from "@modules/Product/exceptions/ProductNotFound";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateOrderProductService {
    constructor(
        @inject("OrderProductsRepository")
        private orderProductsRepository: IOrderProductsRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) { }
    async execute(data: CreateOrderProductDTO): Promise<ProductNotFoundException | OrderNotFoundException  | OrderProduct> {
        const productExists = await this.productsRepository.findByProductCode(data.codigo_produto);

        if (!productExists ) {
            throw new ProductNotFoundException();
        };
        const orderAlreadyExists = await this.ordersRepository.findById(data.pedido_id);

        if (orderAlreadyExists instanceof OrderNotFoundException) {
            throw new OrderProductAlreadyExistsException();
        };
        const newOrderProduct = await this.orderProductsRepository.create(data);

        return newOrderProduct;

    };
};

export { CreateOrderProductService };