import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { ProductNotFoundException } from "@modules/Product/exceptions/ProductNotFound";
import { CreateProductDTO } from "@modules/Product/dtos/CreateProductDTO";
import { ProductMapper } from "@modules/Product/mapper/ProductMapper";


class ProductsRepositoryInMemory implements IProductsRepository {
    private products: Product[];
    constructor() {
        this.products = [];
    }
    async create(data: CreateProductDTO): Promise<Product> {
        const newProduct = new Product();
        Object.assign(newProduct, ProductMapper.toPersistence(data));
        this.save(newProduct)
        return newProduct;
    };
    async save(data: Product): Promise<Product> {
        this.products.push(data);
        return data;
    }
    async findByProductCode(product_code: string): Promise<ProductNotFoundException | Product> {
        const product = this.products.find(product => product.product_code === product_code);
        if (!product) {
            throw new ProductNotFoundException();
        };
        return product;
    };
    async list(): Promise<Product[]> {
        const products = this.products;
        return products;
    };
    async delete(product_code: string): Promise<void> {
        const products = this.products.filter(product => product.product_code !== product_code);
        this.products = products;
    };

};

export { ProductsRepositoryInMemory };