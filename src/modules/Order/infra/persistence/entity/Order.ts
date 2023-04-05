import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";



@Entity("orders")
class Order {
    @PrimaryColumn({ type: 'varchar', nullable: false, unique: true })
    id: string;
    @ManyToMany(() => Invoice, invoice => invoice.orders)
    @JoinTable({
        name: 'invoiceorders',
        joinColumn: {
          name: 'order_id',
          referencedColumnName: 'id',
        }
      })
      invoice?: Invoice[]
    @ManyToMany(() => Product, product => product.orders)
    @JoinTable({
        name: 'orderproducts',
        joinColumn: {
          name: 'order_id',
          referencedColumnName: 'id',
        }
      })
    products?: Product[]
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
    };
};

export { Order };