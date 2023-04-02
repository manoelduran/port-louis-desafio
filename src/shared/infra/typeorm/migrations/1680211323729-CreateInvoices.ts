import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateInvoices1680211323729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "invoices",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "order_id",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "item_number",
                        type: "integer",
                        isNullable: false,
                        isUnique: true
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
                        columnNames: ["item_number"],
                        referencedTableName: "products",
                        referencedColumnNames: ["item_number"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ]
            })
        )
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("invoices");
    };

};
