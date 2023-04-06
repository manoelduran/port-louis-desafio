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
        const orderProducts = await this.orderProductsRepository.list();
        console.log('orderProducts', orderProducts)
       const response = await Promise.all(
             orderProducts.map(async orderProduct => {
                const InvoiceordersAlreadyExists = await this.invoiceOrdersRepository.findByOrderIdAndItemNumber(orderProduct.item_number, orderProduct.order_id);
                if (InvoiceordersAlreadyExists instanceof InvoiceOrderNotFoundException) {
                    throw new InvoiceOrderNotFoundException();
                };

                return InvoiceordersAlreadyExists
            })
        );
        filteredInvoiceOrders = response.filter(orderProduct => orderProduct instanceof InvoiceOrder)
        return filteredInvoiceOrders;

    };
}

export { ListInvoiceOrdersByOrderIdAndItemNumberService };