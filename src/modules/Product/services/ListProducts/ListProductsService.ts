import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListProductsService {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }
    async execute(): Promise<Product[]> {
        const products = await this.productsRepository.list();
        return products;
    };
};

export { ListProductsService };