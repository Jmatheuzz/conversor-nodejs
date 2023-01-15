import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { CreateForeignKey } from '../helpers'

export class createTransactionTable1673805559344 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'to',
            type: 'varchar'
          },
          {
            name: 'from',
            type: 'varchar'
          },
          {
            name: 'amount',
            type: 'double'
          },
          {
            name: 'amount_result',
            type: 'double'
          },
          {
            name: 'rate',
            type: 'double'
          },
          {
            name: 'date',
            type: 'timestamp'
          },
          {
            name: 'user_id',
            type: 'int'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
    const foreignKey = new CreateForeignKey('user_id', 'id', 'users').new()
    await queryRunner.createForeignKey('transactions', foreignKey)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('transactions')
    await queryRunner.dropForeignKeys(table!.name, table!.foreignKeys)
    await queryRunner.dropTable(table!.name)
  }
}
