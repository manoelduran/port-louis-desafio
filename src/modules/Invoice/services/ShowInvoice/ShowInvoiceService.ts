
import { ShowInvoiceDTO } from "@modules/Invoice/dtos/ShowInvoiceDTO";
import { InvoiceNotFoundException } from "@modules/Invoice/exceptions/InvoiceNotFoundException";
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ShowInvoiceService {
    constructor(
        @inject("InvoicesRepository")
        private invoicesRepository: IInvoicesRepository
    ) { }
    async execute({ id, order_id }: ShowInvoiceDTO): Promise<InvoiceNotFoundException | Invoice> {
        let invoiceExists: Invoice;
        if (id && !order_id) {
            const invoiceExists = await this.invoicesRepository.findById(id)
            if (!invoiceExists) {
                throw new InvoiceNotFoundException();
            };

        }
        if (order_id && !id) {
            const invoiceExists = await this.invoicesRepository.findByOrder(order_id)
            if (!invoiceExists) {
                throw new InvoiceNotFoundException();
            };
        }
        return invoiceExists;
    };
};

export { ShowInvoiceService };