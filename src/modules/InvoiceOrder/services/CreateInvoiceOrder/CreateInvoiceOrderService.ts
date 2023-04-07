

import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";
import { CreateInvoiceOrderDTO } from "@modules/InvoiceOrder/dtos/CreateInvoiceOrderDTO";
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
    async execute(data: CreateInvoiceOrderDTO): Promise<InvoiceNotFoundException | OrderNotFoundException  | InvoiceOrder> {
        console.log('data', data)
        const InvoiceExists = await this.invoicesRepository.findById(data.invoice_id);

        if (InvoiceExists instanceof InvoiceNotFoundException) {
            throw new InvoiceNotFoundException();
        };
        const orderAlreadyExists = await this.ordersRepository.findById(data.pedido_id);

        if (orderAlreadyExists instanceof OrderNotFoundException) {
            throw new OrderNotFoundException();
        };
        const newInvoiceOrder = await this.invoiceOrdersRepository.create(data);

        return newInvoiceOrder;

    };
};

export { CreateInvoiceOrderService };