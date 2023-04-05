import { DeleteInvoiceOrderDTO } from "@modules/InvoiceOrder/dtos/DeleteInvoiceOrderDTO";
import { InvoiceOrderNotFoundException } from "@modules/InvoiceOrder/exceptions/InvoiceOrderNotFoundException";
import { InvoiceOrder } from "@modules/InvoiceOrder/infra/persistence/entity/InvoiceOrder";
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteInvoiceOrderService {
    constructor(
        @inject("InvoiceOrdersRepository")
        private invoiceOrdersRepository: IInvoiceOrdersRepository,
    ) { }
    async execute({ item_number }: DeleteInvoiceOrderDTO): Promise<InvoiceOrderNotFoundException | void> {
        const InvoiceOrderExists = await this.invoiceOrdersRepository.findByItemNumber(item_number);
        if (!InvoiceOrderExists) {
            throw new InvoiceOrderNotFoundException();
        };
        await this.invoiceOrdersRepository.delete(InvoiceOrderExists as InvoiceOrder);
    };
};

export { DeleteInvoiceOrderService };