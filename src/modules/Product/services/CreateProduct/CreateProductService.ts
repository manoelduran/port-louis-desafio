

import { CreateProductDTO } from "@modules/Product/dtos/CreateProductDTO";
import { ProductAlreadyExistsException } from "@modules/Product/exceptions/ProductAlreadyExistsException";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateProductService {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }
    async execute(data: CreateProductDTO): Promise<ProductAlreadyExistsException   |Product> {
        const productAlreadyExists = await this.productsRepository.findById(data.item_number);

        if (productAlreadyExists instanceof Product) {
            throw new ProductAlreadyExistsException();
        };
        const newProduct = await this.productsRepository.create(data);

        return newProduct;

    };
};

export { CreateProductService };