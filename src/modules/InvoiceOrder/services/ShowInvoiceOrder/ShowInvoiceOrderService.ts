import { ShowInvoiceOrderDTO } from "@modules/InvoiceOrder/dtos/ShowInvoiceOrderDTO";
import { InvoiceOrderNotFoundException } from "@modules/InvoiceOrder/exceptions/InvoiceOrderNotFoundException";
import { InvoiceOrder } from "@modules/InvoiceOrder/infra/persistence/entity/InvoiceOrder";
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ShowInvoiceOrderService {
    constructor(
        @inject("InvoiceOrdersRepository")
        private invoiceOrdersRepository: IInvoiceOrdersRepository,
    ) { }
    async execute({ item_number }: ShowInvoiceOrderDTO): Promise<InvoiceOrderNotFoundException | InvoiceOrder> {
        const invoiceOrderExists = await this.invoiceOrdersRepository.findByItemNumber(item_number);
        if (!invoiceOrderExists) {
            throw new InvoiceOrderNotFoundException();
        };
        return invoiceOrderExists;
    };
};

export { ShowInvoiceOrderService };