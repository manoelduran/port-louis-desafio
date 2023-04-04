import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { Column, CreateDateColumn, Entity,  JoinTable, ManyToMany,  PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("products")
class Product {
    @PrimaryColumn({ type: 'varchar', nullable: false, unique: true })
    product_code: string;
    @Column({ type: 'numeric', precision: 5, scale: 2 })
    unit_value?: number;
    @ManyToMany(() => Order, order => order.products)
    @JoinTable({
        name: 'orderproducts',
        joinColumn: {
          name: 'product_code',
          referencedColumnName: 'product_code',
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

export { Product };