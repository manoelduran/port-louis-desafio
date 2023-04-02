import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("orders")
class Order {
    @PrimaryColumn({type: 'varchar'})
    id: string;
    @Column({type: 'integer',nullable: false, unique: true})
    item_number: number;
    @ManyToOne(() => Product, (product) => product.item_number)
    @JoinColumn({ name: 'item_number', referencedColumnName: 'item_number', foreignKeyConstraintName: "item_number" })
    products?: Product[];
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
    };
};

export { Order };