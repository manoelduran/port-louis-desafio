import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { CreateOrderProductDTO } from "@modules/OrderProduct/dtos/CreateOrderProductDTO";


export class FileHelper {
    static removeOrderProductDuplicateIds(filesOrder: (Omit<CreateOrderProductDTO, "valor_unitario_produto"> & { valor_unitario_produto: string })[]) {
        const uniqueIds = new Set();
        const orderUniquesArray = filesOrder.filter(order => {
            if (!uniqueIds.has(order.numero_item)) {
                uniqueIds.add(order.numero_item);
                return true;
            }
            return false;
        });
        return orderUniquesArray;

    }
    static removeOrderDuplicateIds(filesOrder?: Order[]) {
        const uniqueIds = new Set();
        const orderUniquesArray = filesOrder.filter(order => {
            if (!uniqueIds.has(order.id)) {
                uniqueIds.add(order.id);
                return true;
            }
            return false;
        });
        return orderUniquesArray;

    }
    static removeInvoiceDuplicateIds(filesInvoice?: Invoice[]) {
        const uniqueIds = new Set();
        const invoiceUniquesArray = filesInvoice.filter(invoice => {
            if (!uniqueIds.has(invoice.id)) {
                uniqueIds.add(invoice.id);
                return true;
            }
            return false;
        });
        return invoiceUniquesArray;

    }
    static removeTxtExtension(file: string) {
        if (file.endsWith(".txt")) {
            return file.slice(1, -4);
        } else {
            return file;
        }
    }
}