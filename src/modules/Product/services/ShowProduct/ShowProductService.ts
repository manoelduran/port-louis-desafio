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
    async execute({ codigo_produto }: ShowProductDTO): Promise<ProductNotFoundException | Product> {
        const productExists = await this.productsRepository.findByProductCode(codigo_produto);
        if (!productExists) {
            throw new ProductNotFoundException();
        };
        return productExists;
    };
};

export { ShowProductService };