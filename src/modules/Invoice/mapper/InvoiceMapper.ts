import { Mapper } from '@shared/domain/Mapper';
import { CreateInvoiceDTO } from '@modules/Invoice/dtos/CreateInvoiceDTO';
import { Invoice } from '../infra/persistence/entity/Invoice';

export class InvoiceMapper implements Mapper<Invoice> {
    public static toPersistence(txtData: CreateInvoiceDTO): Invoice {
        return {
            id: txtData.id,
        };
    }

    public static toTxt(persistence: Invoice): CreateInvoiceDTO {
        return {
            id: persistence.id,
        };
    }
}
