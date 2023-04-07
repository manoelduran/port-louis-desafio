import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { IInvoiceOrdersRepository } from "../IInvoiceOrdersRepository";
import { CreateInvoiceOrderDTO } from "@modules/InvoiceOrder/dtos/CreateInvoiceOrderDTO";
import { InvoiceOrder } from "@modules/InvoiceOrder/infra/persistence/entity/InvoiceOrder";
import { InvoiceOrdersMapper } from "@modules/InvoiceOrder/mapper/InvoiceOrdersMapper";
import { InvoiceOrderNotFoundException } from "@modules/InvoiceOrder/exceptions/InvoiceOrderNotFoundException";


class InvoiceOrdersRepositoryInMemory implements IInvoiceOrdersRepository {
    private invoiceOrders: InvoiceOrder[];
    constructor() {
        this.invoiceOrders = [];
    }
    findById(id: string): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {
        throw new Error("Method not implemented.");
    }
    findByInvoiceId(invoice_id: string): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {
        throw new Error("Method not implemented.");
    }
    filterInvoiceOrdersByOrderId(invoices: InvoiceOrder[]): Promise<{ item_number: number; product_quantity: number; order_id: string; }[]> {
        throw new Error("Method not implemented.");
    }
    findByOrderIdAndItemNumber(item_number: number, order_id: string): Promise<boolean | InvoiceOrderNotFoundException> {
        throw new Error("Method not implemented.");
    }
    async create(txtData: CreateInvoiceOrderDTO): Promise<InvoiceOrder>{
        const newInvoiceOrder = new InvoiceOrder();
        Object.assign(newInvoiceOrder, InvoiceOrdersMapper.toPersistence(txtData));
        this.save(newInvoiceOrder);
        return newInvoiceOrder;
    };
    async save(data: InvoiceOrder): Promise<InvoiceOrder> {
        this.invoiceOrders.push(data);
        return data;
    };
    async findByItemNumber(item_number: number): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {
        const orderProduct = this.invoiceOrders.find(order => order.item_number === item_number);
        if (!orderProduct) {
            throw new OrderNotFoundException();
        };
        return orderProduct;
    }
    async findByOrderId(order_id: string): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {
        const orderProduct = this.invoiceOrders.find(order => order.order_id === order_id);
        if (!orderProduct) {
            throw new OrderNotFoundException();
        };
        return orderProduct;
    }
    async list(): Promise<InvoiceOrder[]> {
        const invoiceOrders = this.invoiceOrders;
        return invoiceOrders;
    };
    async delete(invoiceOrder: InvoiceOrder): Promise<void> {
        const removedInvoiceOrder = this.invoiceOrders.filter(order => order.id !== invoiceOrder.id);
        this.invoiceOrders = removedInvoiceOrder;
    };

};

export { InvoiceOrdersRepositoryInMemory };