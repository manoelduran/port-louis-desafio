import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";



@Entity("orders")
class Order {
    @PrimaryColumn({ type: 'varchar', nullable: false, unique: true })
    id: string;
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