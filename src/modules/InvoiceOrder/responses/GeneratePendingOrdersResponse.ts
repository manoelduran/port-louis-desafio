import { Product } from "@modules/Product/infra/persistence/entity/Product";

interface PendingProduct {
numero_item: number;
saldo_quantidade: number;
}

export interface PendingOrders {
    valor_total_pedido: number;
    saldo_valor: number;
    produtos_pendentes: PendingProduct[]
}

export type GeneratePendingOrdersResponse = Promise<PendingOrders>;