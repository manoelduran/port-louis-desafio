import { ProductNotFoundException } from "@modules/Product/exceptions/ProductNotFound";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { CreateProductDTO } from "@modules/Product/dtos/CreateProductDTO";


interface IProductsRepository {
    create(data: CreateProductDTO): Promise<Product>;
    findByProductCode(product_code: string): Promise<ProductNotFoundException | Product>;
    delete(product_code: string): Promise<void>;
    list(): Promise<Product[]>;
    save(data: Product): Promise<Product>;
};

export { IProductsRepository };