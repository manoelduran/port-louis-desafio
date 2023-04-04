import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProduct1680473389496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "product_code",
                        type: "varchar",
                        isNullable: false,
                        isPrimary: true,
                        isUnique: true
                    },
                    {
                        name: "unit_value",
                        type: 'numeric',
                        precision: 5,
                        scale: 2
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
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
