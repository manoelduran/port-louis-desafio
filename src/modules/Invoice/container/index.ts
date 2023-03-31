import { container } from "tsyringe";
import { InvoicesRepository } from "@modules/Invoice/infra/persistence/repository/InvoicesRepository";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";


container.registerSingleton<IInvoicesRepository>(
    "InvoicesRepository",
    InvoicesRepository
)