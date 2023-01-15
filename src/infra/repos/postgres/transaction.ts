import { Transaction } from '@/infra/repos/postgres/entities'
import { DeleteTransaction, LoadTransactions, ShowTransaction, LoadTransactionByUser, InsertTransaction } from '@/domain/contracts/repos'

import { PgRepository } from '@/infra/repos/postgres/repository'

type GetOutput = LoadTransactions.Output
type ShowUserInput = LoadTransactionByUser.Input
type ShowUserOutput = LoadTransactionByUser.Output
type ShowInput = ShowTransaction.Input
type ShowOutput = ShowTransaction.Output
type InsertInput = InsertTransaction.Input
type InsertOutput = InsertTransaction.Output
type DeleteInput = DeleteTransaction.Input
type DeleteOutput = DeleteTransaction.Output

export class TransactionRepository extends PgRepository implements LoadTransactions, ShowTransaction, DeleteTransaction, LoadTransactionByUser {
  async get (): Promise<GetOutput> {
    return await this.getRepository(Transaction).find()
  }

  async show ({ id }: ShowInput): Promise<ShowOutput> {
    return await this.getRepository(Transaction).findOne(id)
  }

  async listByUser ({ id }: ShowUserInput): Promise<ShowUserOutput> {
    return await this.getRepository(Transaction).find({ where: { user: id } })
  }

  async insert (input: InsertInput): Promise<InsertOutput> {
    const { id } = await this.getRepository(Transaction).save(input)
    return this.show({ id: id.toString() })
  }

  async delete ({ id }: DeleteInput): Promise<DeleteOutput> {
    await this.getRepository(Transaction).delete(id)
  }
}
