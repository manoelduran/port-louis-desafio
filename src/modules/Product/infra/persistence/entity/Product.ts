import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity("products")
class Product {
    @PrimaryColumn({ type: 'integer', nullable: false, unique: true })
    item_number: number;
    @Column({ type: 'varchar' })
    product_code?: string;
    @Column({ type: 'integer' })
    product_quantity: number;
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    unit_value?: number;
    @CreateDateColumn()
    created_at?: Date;
    @UpdateDateColumn()
    updated_at?: Date;
    constructor() {
    };
};

export { Product };