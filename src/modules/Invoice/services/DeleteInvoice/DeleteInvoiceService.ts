
import { DeleteInvoiceDTO } from "@modules/Invoice/dtos/DeleteInvoiceDTO";
import { InvoiceNotFoundException } from "@modules/Invoice/exceptions/InvoiceNotFoundException";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class DeleteInvoiceService {
    constructor(
        @inject("InvoicesRepository")
        private invoicesRepository: IInvoicesRepository
    ) { }
    async execute({ id }: DeleteInvoiceDTO): Promise<InvoiceNotFoundException | void> {
        const invoiceExists = await this.invoicesRepository.findById(id)
        if (!invoiceExists) {
            throw new InvoiceNotFoundException();
        };
        await this.invoicesRepository.delete(id);
    };
};

export { DeleteInvoiceService };