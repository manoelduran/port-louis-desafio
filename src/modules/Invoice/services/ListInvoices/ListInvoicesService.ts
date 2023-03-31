
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";
import { inject, injectable } from "tsyringe";


@injectable()
class ListInvoicesService {
    constructor(
        @inject("InvoicesRepository")
        private invoicesRepository: IInvoicesRepository
    ) { }
    async execute(): Promise<Invoice[]> {
        const invoices = await this.invoicesRepository.list();
        return invoices;
    };
};

export { ListInvoicesService };