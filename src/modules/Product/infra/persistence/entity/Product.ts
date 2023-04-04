import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("products")
class Product {
    @PrimaryColumn({ type: 'varchar', nullable: false, unique: true })
    product_code: string;
    @Column({ type: 'decimal', precision: 5, scale: 2 })
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