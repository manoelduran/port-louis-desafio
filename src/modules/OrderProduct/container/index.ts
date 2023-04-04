import { container } from "tsyringe";
import { IOrderProductsRepository } from "../repositories/IOrderProductsRepository";
import { OrderProductsRepository } from "../infra/persistence/repository/OrderProductsRepository";





container.registerSingleton<IOrderProductsRepository>(
    "OrderProductsRepository",
    OrderProductsRepository
)