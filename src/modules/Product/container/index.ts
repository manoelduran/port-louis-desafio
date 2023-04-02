import { container } from "tsyringe";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { ProductsRepository } from "@modules/Product/infra/persistence/repository/ProductsRepository";





container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
)