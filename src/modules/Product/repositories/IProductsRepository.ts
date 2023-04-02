import { ProductNotFoundException } from "@modules/Product/exceptions/ProductNotFound";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { CreateProductDTO } from "@modules/Product/dtos/CreateProductDTO";


interface IProductsRepository {
    create(data: CreateProductDTO): Promise<Product>;
    findById(item_number: number): Promise<ProductNotFoundException | Product>;
    delete(item_number: number): Promise<void>;
    list(): Promise<Product[]>;
    save(data: Product): Promise<Product>;
};

export { IProductsRepository };