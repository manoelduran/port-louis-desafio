
import { injectable } from "tsyringe";
import { Repository, } from "typeorm";
import { PostgresDataSource } from "../../../../../../ormconfig";
import { InvoiceOrderNotFoundException } from "@modules/InvoiceOrder/exceptions/InvoiceOrderNotFoundException";
import { InvoiceOrder } from "../entity/InvoiceOrder";
import { CreateInvoiceOrderDTO } from "@modules/InvoiceOrder/dtos/CreateInvoiceOrderDTO";
import { InvoiceOrdersMapper } from "@modules/InvoiceOrder/mapper/InvoiceOrdersMapper";
import { IInvoiceOrdersRepository } from "@modules/InvoiceOrder/repositories/IInvoiceOrdersRepository";
@injectable()
class InvoiceOrdersRepository implements IInvoiceOrdersRepository {
    private ormRepository: Repository<InvoiceOrder>
    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(InvoiceOrder);
    }
    async save(data: InvoiceOrder): Promise<InvoiceOrder> {
        const newInvoiceOrders = await this.ormRepository.save(data);
        return newInvoiceOrders;
    };
    async create(txtData?: CreateInvoiceOrderDTO): Promise<InvoiceOrder> {
        const newInvoiceOrders = this.ormRepository.create(InvoiceOrdersMapper.toPersistence(txtData));
        await this.save(newInvoiceOrders);
        return newInvoiceOrders;
    };
    async findByItemNumber(item_number: number): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {

        const foundInvoiceOrders = await this.ormRepository.findOne({
            where: {
                item_number: item_number
            }
        });
        if (foundInvoiceOrders instanceof InvoiceOrderNotFoundException) {
            throw new InvoiceOrderNotFoundException();
        };
        return foundInvoiceOrders;
    };
    async findByOrderId(order_id: string): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {
        const foundInvoiceOrders = await this.ormRepository.findOne({
            where: {
                order_id: order_id
            }
        });
        if (foundInvoiceOrders instanceof InvoiceOrderNotFoundException) {
            throw new InvoiceOrderNotFoundException();
        };
        return foundInvoiceOrders;
    };
    async findByInvoiceId(invoice_id: string): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {
        const foundInvoiceOrders = await this.ormRepository.findOne({
            where: {
                invoice_id: invoice_id
            }
        });
        if (foundInvoiceOrders instanceof InvoiceOrderNotFoundException) {
            throw new InvoiceOrderNotFoundException();
        };
        return foundInvoiceOrders;
    };
    async list(): Promise<InvoiceOrder[]> {
        return this.ormRepository.find();
    };
    async delete(invoiceOrder: InvoiceOrder): Promise<void> {
         this.ormRepository.delete(invoiceOrder.id);

    };
};

export { InvoiceOrdersRepository };