
interface Item {
    number: number;
    quantity: number;
    code: string;
    value: number;
};

interface CreateOrderDTO {
    id: string;
    item: Item;
};

export {CreateOrderDTO};