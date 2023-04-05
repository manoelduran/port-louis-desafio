import { container } from "tsyringe";
import { InvoiceOrdersRepository } from "../infra/persistence/repository/InvoiceOrdersRepository";
import { IInvoiceOrdersRepository } from "../repositories/IInvoiceOrdersRepository";





container.registerSingleton<IInvoiceOrdersRepository>(
    "InvoiceOrdersRepository",
    InvoiceOrdersRepository
)