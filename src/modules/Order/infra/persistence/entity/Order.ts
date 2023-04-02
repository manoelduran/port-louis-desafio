import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("orders")
class Order {
    @PrimaryColumn({type: 'varchar'})
    id: string;
    @Column({type: 'integer',nullable: false, unique: true})
    item_number: number;
    @Column({type: 'varchar'})
    product_code: string;
    @OneToMany(() => Invoice, (Invoice) => Invoice.order_id)
    invoice?: Invoice;
    @Column({type: 'integer' })
    product_quantity: number;
    @Column({type: 'decimal', precision: 5, scale: 2})
    unit_value: number;
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
  
    };
};

export { Order };