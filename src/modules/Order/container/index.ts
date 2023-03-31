import { container } from "tsyringe";
import { OrdersRepository } from "@modules/Order/infra/persistence/repository/OrdersRepository";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";





container.registerSingleton<IOrdersRepository>(
    "OrdersRepository",
    OrdersRepository
)