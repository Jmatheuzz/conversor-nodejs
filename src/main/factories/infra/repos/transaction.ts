import { TransactionRepository } from '@/infra/repos/postgres/transaction'

export const makeTransactionRepo = (): TransactionRepository => {
  return new TransactionRepository()
}
