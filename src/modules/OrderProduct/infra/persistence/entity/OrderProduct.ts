import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("orderproducts")
class OrderProduct {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: 'integer', nullable: false, unique: true})
    item_number: number;
    @Column({ type: 'varchar'})
    order_id: string;
    @Column({ type: 'integer' })
    product_quantity: number;
    @Column({ type: 'varchar' })
    product_code: string;
    @ManyToOne(() => Order, order => order.id)
    @JoinColumn({ name: 'order_id' })
    order?: Order;
    @ManyToOne(() => Product, product => product.product_code)
    @JoinColumn({ name: 'product_code' })
    product?: Product;
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
    };
};

export { OrderProduct };