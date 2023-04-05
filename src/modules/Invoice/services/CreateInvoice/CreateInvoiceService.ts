
import { CreateInvoiceDTO } from "@modules/Invoice/dtos/CreateInvoiceDTO";
import { InvoiceAlreadyExistsException } from "@modules/Invoice/exceptions/InvoiceAlreadyExistsException";
import { ItemNumberNotExistsException } from "@modules/Invoice/exceptions/ItemNumberNotExistsException";
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";
import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class CreateInvoiceService {
    constructor(
        @inject("InvoicesRepository")
        private invoicesRepository: IInvoicesRepository,
    ) { }
    async execute(data: CreateInvoiceDTO): Promise<InvoiceAlreadyExistsException | Invoice> {
        const invoiceAlreadyExists = await this.invoicesRepository.findById(data.id);
        if (invoiceAlreadyExists instanceof Invoice) {
           throw new InvoiceAlreadyExistsException();
        };
        const newInvoice = await this.invoicesRepository.create(data);
        return newInvoice;
    };
};

export { CreateInvoiceService };