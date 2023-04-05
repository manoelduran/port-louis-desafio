
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
    async execute({ id, }: ShowInvoiceDTO): Promise<InvoiceNotFoundException | Invoice> {
        const invoiceExists = await this.invoicesRepository.findById(id)
        if (invoiceExists instanceof InvoiceNotFoundException) {
            throw new InvoiceNotFoundException();
        };
        return invoiceExists;
    };
};

export { ShowInvoiceService };