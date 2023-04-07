import { InvoiceOrderNotFoundException } from "@modules/InvoiceOrder/exceptions/InvoiceOrderNotFoundException";
import { InvoiceOrder } from "@modules/InvoiceOrder/infra/persistence/entity/InvoiceOrder";
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListInvoiceOrdersByOrderIdAndItemNumberService {
    constructor(
        @inject("InvoiceOrdersRepository")
        private invoiceOrdersRepository: IInvoiceOrdersRepository,
        @inject("OrderProductsRepository")
        private orderProductsRepository: IOrderProductsRepository
    ) { }
    async execute(): Promise<InvoiceOrderNotFoundException | InvoiceOrder[]> {
        let filteredInvoiceOrders: InvoiceOrder[] = [];
        const invoiceOrders = await this.invoiceOrdersRepository.list();
        console.log('InvoiceordersAlreadyExists', invoiceOrders.length)
       await Promise.all(
        invoiceOrders.map(async invoiceOrder => {
                const InvoiceordersAlreadyExists = await this.invoiceOrdersRepository.findByOrderIdAndItemNumber(invoiceOrder.item_number, invoiceOrder.order_id);
                if (InvoiceordersAlreadyExists instanceof InvoiceOrderNotFoundException) {
                    throw new InvoiceOrderNotFoundException();
                };
                if(InvoiceordersAlreadyExists === true) {
                    console.log('InvoiceordersAlreadyExists', InvoiceordersAlreadyExists)
                    filteredInvoiceOrders.push(invoiceOrder)
                }
                return InvoiceordersAlreadyExists
            })
        );
        return filteredInvoiceOrders;

    };
}

export { ListInvoiceOrdersByOrderIdAndItemNumberService };