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
    async execute({ product_code }: ShowProductDTO): Promise<ProductNotFoundException | Product> {
        const productExists = await this.productsRepository.findByProductCode(product_code);
        if (!productExists) {
            throw new ProductNotFoundException();
        };
        return productExists;
    };
};

export { ShowProductService };