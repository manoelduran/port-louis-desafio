import { DeleteProductDTO } from "@modules/Product/dtos/DeleteProductDTO";
import { ProductNotFoundException } from "@modules/Product/exceptions/ProductNotFound";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteProductService {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }
    async execute({ codigo_produto }: DeleteProductDTO): Promise<ProductNotFoundException | void> {
        const productExists = await this.productsRepository.findByProductCode(codigo_produto);
        if (!productExists) {
            throw new ProductNotFoundException();
        };
        await this.productsRepository.delete(codigo_produto);
    };
};

export { DeleteProductService };