

import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { CreateInvoiceOrderDTO } from "@modules/InvoiceOrder/dtos/CreateInvoiceOrderDTO";
import { InvoiceOrderAlreadyExistsException } from "@modules/InvoiceOrder/exceptions/InvoiceOrderAlreadyExistsException";
import { InvoiceOrder } from "@modules/InvoiceOrder/infra/persistence/entity/InvoiceOrder";
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
import { inject, injectable } from "tsyringe";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";
import { InvoiceNotFoundException } from "@modules/Invoice/exceptions/InvoiceNotFoundException";


@injectable()
class CreateInvoiceOrderService {
    constructor(
        @inject("InvoiceOrdersRepository")
        private invoiceOrdersRepository: IInvoiceOrdersRepository,
        @inject("InvoicesRepository")
        private invoicesRepository: IInvoicesRepository,
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ) { }
    async execute(data: CreateInvoiceOrderDTO): Promise<InvoiceNotFoundException | OrderNotFoundException | InvoiceOrderAlreadyExistsException | InvoiceOrder> {
        console.log('data', data)
        const InvoiceExists = await this.invoicesRepository.findById(data.invoice_id);

        if (InvoiceExists instanceof InvoiceNotFoundException) {
            throw new InvoiceNotFoundException();
        };
        const orderAlreadyExists = await this.ordersRepository.findById(data.pedido_id);

        if (orderAlreadyExists instanceof OrderNotFoundException) {
            throw new InvoiceOrderAlreadyExistsException();
        };
       /* const InvoiceordersAlreadyExists = await this.invoiceOrdersRepository.findById(data.id);
        console.log('InvoiceordersAlreadyExists', InvoiceordersAlreadyExists)
        if (InvoiceordersAlreadyExists instanceof InvoiceOrder) {
            throw new InvoiceOrderAlreadyExistsException();
        };*/
    
        const newInvoiceOrder = await this.invoiceOrdersRepository.create(data);

        return newInvoiceOrder;

    };
};

export { CreateInvoiceOrderService };