import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("invoices")
class Invoice {
    @PrimaryColumn({ type: 'varchar', nullable: false, unique: true })
    id: string;
    @ManyToMany(() => Order, order => order.products)
    @JoinTable({
        name: 'invoiceorders',
        joinColumn: {
          name: 'invoice_id',
          referencedColumnName: 'id',
        }
      })
    orders?: Order[]
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
    };
};

export { Invoice };