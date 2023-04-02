
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
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) { }
    async execute(data: CreateInvoiceDTO): Promise<OrderNotFoundException |  InvoiceAlreadyExistsException | Invoice> {
        const orderIdExists = await this.ordersRepository.findById(data.order_id);
        if(!orderIdExists) {
            throw new OrderNotFoundException();
        }
        const invoiceAlreadyExists = await this.invoicesRepository.findById(data.id);
        if (invoiceAlreadyExists) {
           throw new InvoiceAlreadyExistsException();
        };
        const newInvoice = await this.invoicesRepository.create(data);
        return newInvoice;
    };
};

export { CreateInvoiceService };