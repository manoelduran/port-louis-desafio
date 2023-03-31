
interface Item {
    number: number;
    quantity: number;
};

interface CreateInvoiceDTO {
    id: string;
    order_id: string;
    item: Item;
};

export { CreateInvoiceDTO };