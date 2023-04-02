import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProduct1680473389496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "item_number",
                        type: "integer",
                        isNullable: false,
                        isPrimary: true,
                        isUnique: true
                    },
                    {
                        name: "product_code",
                        type: "varchar"
                    },
                    {
                        name: "product_quantity",
                        type: "integer",
                    },
                    {
                        name: "unit_value",
                        type: 'decimal',
                        precision: 5
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
