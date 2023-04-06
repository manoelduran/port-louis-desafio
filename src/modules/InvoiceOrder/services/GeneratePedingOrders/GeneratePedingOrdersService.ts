import fs from 'fs';
import path from 'path';
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
import { GeneratePendingOrdersResponse } from "@modules/InvoiceOrder/responses/GeneratePendingOrdersResponse";
import { OrderProductNotFoundException } from "@modules/OrderProduct/exceptions/OrderProductNotFoundException";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

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
        const invoiceOrders = await this.invoiceOrdersRepository.list();
        const result = await this.invoiceOrdersRepository.findProductQuantitySumByItemNumber(invoiceOrders);
        console.log('result', result)
        await Promise.all([
            result.map(async sum => {
                console.log('invoiceOrder22222', sum)
                const compareTablesWithItemNumber = await this.orderProductsRepository.findByItemNumber(sum.item_number);
                if(compareTablesWithItemNumber instanceof OrderProductNotFoundException) {
                    throw new OrderProductNotFoundException();
                };
                console.log('compareTablesWithItemNumber', compareTablesWithItemNumber)
                if(sum.product_quantity > compareTablesWithItemNumber.product_quantity) {
                    throw new Error('O bicho pegou por aqui')
                }
                if(sum.product_quantity < compareTablesWithItemNumber.product_quantity) {

                }
            })
        ])

        return
    }
}

export {GeneratePedingOrdersService}