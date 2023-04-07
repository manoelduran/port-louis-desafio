


interface CreateOrderProductDTO {
    id?: string;
    numero_item: number;
    pedido_id: string;
    codigo_produto: string;
    valor_unitario_produto?: number;
    quantidade_produto: number;
    };
    export {CreateOrderProductDTO};