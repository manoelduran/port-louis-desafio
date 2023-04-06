import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateInvoiceOrders1680687679737 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "invoiceorders",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: "item_number",
                    type: "integer",
                    isNullable: false,
                    isUnique: false
                },
                {
                    name: "order_id",
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: "invoice_id",
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
                    name: "FKInvoice",
                    columnNames: ["invoice_id"],
                    referencedTableName: "invoices",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("invoiceorders")
    }

}
