import fs from 'fs';
import path from 'path';
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
import { GeneratePendingOrdersResponse, PendingOrders, PendingProduct } from "@modules/InvoiceOrder/responses/GeneratePendingOrdersResponse";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";
import { FileHelper } from '@shared/helpers/fileHelper';
import { OrderProduct } from '@modules/OrderProduct/infra/persistence/entity/OrderProduct';

export interface orderProductWithUnitValue {
    item_number: number;
    order_id: string;
    product_quantity: number;
    product_code: string;
    unit_value: number;
}
@injectable()
class GeneratePedingOrdersService {
    constructor(
        @inject("InvoiceOrdersRepository")
        private invoiceOrdersRepository: IInvoiceOrdersRepository,
        @inject("OrderProductsRepository")
        private orderProductsRepository: IOrderProductsRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ) { }
    async execute(): GeneratePendingOrdersResponse {
        let pendingOrders = {} as PendingOrders;
        let pendingProducts = [] as PendingProduct[];
        let filteredOrderProducts = [] as OrderProduct[];
        let orderProductsWithUnitValue = [] as orderProductWithUnitValue[];
        let total_value =  0;
        let value_total_order = 0;
        const invoiceOrders = await this.invoiceOrdersRepository.list();

        const filteredInvoices = await this.invoiceOrdersRepository.filterInvoiceOrdersByOrderId(invoiceOrders);
        for (const filteredInvoice of filteredInvoices) {
            const compareTablesWithItemNumber = await this.orderProductsRepository.findOrderProductsByOrderIdAndItemNumber(filteredInvoice.item_number, filteredInvoice.order_id)
            filteredOrderProducts.push(compareTablesWithItemNumber)
        }
        const removedNullObjects = FileHelper.removeNull(filteredOrderProducts);
        filteredOrderProducts = removedNullObjects;
        for (const OrderProject of removedNullObjects) {
            const result = await this.productsRepository.addUnitValueToOrderProduct(OrderProject);
            orderProductsWithUnitValue.push(result);
        };
        const dataWithTotalValue = orderProductsWithUnitValue.map(orderProductWithUnitValue => ({
            ...orderProductWithUnitValue,
            total_value: orderProductWithUnitValue.product_quantity * orderProductWithUnitValue.unit_value
        }));
        const filteredInvoicesByItemNumber = filteredInvoices.reduce((accumulator, current) => {
            const existingInvoice = accumulator.find(invoice => invoice.item_number === current.item_number);
            if (existingInvoice) {
                existingInvoice.product_quantity += current.product_quantity;
            } else {
                accumulator.push(current);
            }
            return accumulator;
        }, []);
        const filteredOrders = dataWithTotalValue.reduce((accumulator, current) => {
            const existingOrder = accumulator.find(order => order.item_number === current.item_number);
            if (existingOrder) {
                existingOrder.product_quantity += current.product_quantity;
                existingOrder.total_value += current.total_value;
            } else {
                accumulator.push(current);
            }
            return accumulator;
        }, []);

        filteredInvoicesByItemNumber.forEach((filteredinvoice) => {
            filteredOrders.forEach((filteredOrder) => {
                if (filteredinvoice.product_quantity > filteredOrder.product_quantity) {
                    console.log('Error! InvoiceOrders product quantity is greater than of the order!')
                }
                if (filteredinvoice.product_quantity < filteredOrder.product_quantity) {
                    const pendingOrder = {
                        numero_item: filteredOrder.item_number,
                        order_id: filteredOrder.order_id,
                        saldo_quantidade: filteredOrder.product_quantity - filteredinvoice.product_quantity
                    } as PendingProduct
                    total_value += pendingOrder.saldo_quantidade
                    value_total_order += filteredOrder.total_value
                    pendingProducts.push(pendingOrder)
                }
            });
        })
        pendingOrders = {
            valor_total_pedido: value_total_order,
            saldo_valor: total_value,
            produtos_pendentes: pendingProducts
        };
        const toTxtPedingOrders = JSON.stringify(pendingOrders)
        const fileName = 'PedingOrders.txt'
        const caminhoCompleto = path.join('src/assets/PedidosPendentes', fileName);
        fs.writeFile(caminhoCompleto, toTxtPedingOrders, () => {
            console.log('File created successfully!')
        })
        return pendingOrders;
}
}

export { GeneratePedingOrdersService }