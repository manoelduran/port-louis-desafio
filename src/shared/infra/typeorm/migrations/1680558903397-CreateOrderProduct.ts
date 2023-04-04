import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateOrderProduct1680558903397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orderproducts",
            columns: [
                {
                    name: "item_number",
                    type: "integer",
                    isNullable: false,
                    isPrimary: true,
                    isUnique: true
                },
                {
                    name: "order_id",
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: "product_code",
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: "product_quantity",
                    type: "integer",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
            foreignKeys: [
                {
                    name: "FKOrder",
                    columnNames: ["order_id"],
                    referencedTableName: "orders",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
                {
                    name: "FKProduct",
                    columnNames: ["product_code"],
                    referencedTableName: "products",
                    referencedColumnNames: ["product_code"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orderproducts")
    }

}
