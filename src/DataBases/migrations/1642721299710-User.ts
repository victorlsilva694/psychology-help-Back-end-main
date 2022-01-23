import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1642721299710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "User",
            columns: [
              {
                name: "id",
                type: "integer",
                isPrimary: true,
                isGenerated: true,
              },
              {
                name: "Name",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "Email",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "ImagePath",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "Password",
                type: "varchar",
                isNullable: true,
              },
            ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("User");
      }

}
