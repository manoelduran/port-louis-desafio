
import { injectable } from "tsyringe";
import { Repository, QueryBuilder } from "typeorm";
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
    async findById(id: string): Promise<InvoiceOrder | InvoiceOrderNotFoundException> {

        const foundInvoiceOrders = await this.ormRepository.findOne({
            where: {
                id: id
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
    async findByInvoiceId(invoice_id: string): Promise<InvoiceOrderNotFoundException | InvoiceOrder  > {
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
    async filterInvoiceOrdersByOrderId(invoices: InvoiceOrder[]): Promise<{ item_number: number, product_quantity: number, order_id: string }[]> {
        const invoiceOrdersResult = await this.ormRepository.createQueryBuilder('invoiceorders')
          .select('invoiceorders.order_id', 'order_id')
          .addSelect('invoiceorders.item_number', 'item_number')
          .addSelect('invoiceorders.product_quantity', 'product_quantity')
          .whereInIds(invoices)
          .getRawMany();
        return invoiceOrdersResult.map(row => ({item_number: row.item_number, product_quantity: row.product_quantity, order_id: row.order_id}));
      }
    async findByOrderIdAndItemNumber(item_number: number, order_id: string): Promise<InvoiceOrderNotFoundException | boolean> {
        const query = await this.ormRepository.createQueryBuilder('invoiceorders')
        .where('invoiceorders.order_id = :order_id', { order_id })
        .andWhere('invoiceorders.item_number = :item_number', { item_number })
        .getCount();
        if(query === 0) {
            throw new InvoiceOrderNotFoundException()
        }
      return query > 0;
    }
    async list(): Promise<InvoiceOrder[]> {
        return this.ormRepository.find();
    };
    async delete(invoiceOrder: InvoiceOrder): Promise<void> {
         this.ormRepository.delete(invoiceOrder.id);

    };
};

export { InvoiceOrdersRepository };