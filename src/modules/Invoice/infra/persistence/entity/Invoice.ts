import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("invoices")
class Invoice {
    @PrimaryColumn({type: 'varchar'})
    id: string;
    @Column({ type: 'varchar' ,nullable: false})
    order_id: string;
    @ManyToOne(() => Order, (order) => order.id)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id', foreignKeyConstraintName: "order_id" })
    orders: Order[];
    @Column({type: 'integer',nullable: false, unique: true})
    item_number: number;
    @Column({type: 'integer' })
    product_quantity: number;
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
        if (this.id) {
            this.created_at = new Date();
        };
    };
};

export { Invoice };