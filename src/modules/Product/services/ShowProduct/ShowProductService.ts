import { ShowProductDTO } from "@modules/Product/dtos/ShowProductDTO";
import { ProductNotFoundException } from "@modules/Product/exceptions/ProductNotFound";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ShowProductService {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }
    async execute({ item_number }: ShowProductDTO): Promise<ProductNotFoundException | Product> {
        const productExists = await this.productsRepository.findById(item_number);
        if (!productExists) {
            throw new ProductNotFoundException();
        };
        return productExists;
    };
};

export { ShowProductService };