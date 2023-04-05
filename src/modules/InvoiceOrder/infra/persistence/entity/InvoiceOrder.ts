import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("invoiceorders")
class InvoiceOrder {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: 'integer', nullable: false, unique: true})
    item_number: number;
    @Column({ type: 'varchar', nullable: false, unique: true })
    order_id: string;
    @Column({ type: 'integer' })
    product_quantity: number;
    @Column({ type: 'varchar' })
    invoice_id: string;
    @ManyToOne(() => Order, order => order.id)
    @JoinColumn({ name: 'order_id' })
    order?: Order;
    @ManyToOne(() => Invoice, invoice => invoice.id)
    @JoinColumn({ name: 'invoice_id' })
    invoice?: Invoice;
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
    };
};

export { InvoiceOrder };