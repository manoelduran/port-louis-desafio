import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("invoices")
class Invoice {
    @PrimaryColumn({ type: 'varchar', nullable: false, unique: true })
    id: string;
    @Column({ type: 'varchar', nullable: false, unique: true })
    order_id: string;
    @ManyToOne(() => Order, (order) => order.id)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id', foreignKeyConstraintName: "order_id" })
    orders?: Order[];
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
    };
};

export { Invoice };