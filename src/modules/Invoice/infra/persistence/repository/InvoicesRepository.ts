
import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { IInvoicesRepository } from '@modules/Invoice/repositories/IInvoicesRepository';
import { CreateInvoiceDTO } from '@modules/Invoice/dtos/CreateInvoiceDTO';
import { InvoiceNotFoundException } from '@modules/Invoice/exceptions/InvoiceNotFoundException';
import { InvoiceMapper } from '@modules/Invoice/mapper/InvoiceMapper';
import { PostgresDataSource } from "@shared/infra/typeorm/ormconfig";

@injectable()
class InvoicesRepository implements IInvoicesRepository {
    private ormRepository: Repository<Invoice>
    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(Invoice);
    };
    async create(data: CreateInvoiceDTO): Promise<Invoice> {
        const newInvoice = this.ormRepository.create(InvoiceMapper.toPersistence(data));
        await this.ormRepository.save(newInvoice);
        return newInvoice;
    };
    async findByOrder(order_id: string): Promise<Invoice> {
        const foundInvoice = await this.ormRepository.findOne({
            where: {
                id: order_id
            }
        });
        if (!foundInvoice) {
            throw new InvoiceNotFoundException();
        };
        return foundInvoice;
    };
    async findById(id: string): Promise<Invoice> {
        const foundInvoice = await this.ormRepository.findOne({
            where: {
                id: id
            }
        });
        if (!foundInvoice) {
            throw new InvoiceNotFoundException();
        };
        return foundInvoice;
    };
    async list(): Promise<Invoice[]> {
        return this.ormRepository.find();
    };
    async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    };
};

export { InvoicesRepository };