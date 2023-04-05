import { InvoiceOrder } from "@modules/InvoiceOrder/infra/persistence/entity/InvoiceOrder";
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListInvoiceOrdersService {
    constructor(
        @inject("InvoiceOrdersRepository")
        private invoiceOrdersRepository: IInvoiceOrdersRepository,
    ) { }
    async execute(): Promise<InvoiceOrder[]> {
        const invoiceOrders = await this.invoiceOrdersRepository.list();
        return invoiceOrders;
    };
};

export { ListInvoiceOrdersService };