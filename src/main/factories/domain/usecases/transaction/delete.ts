import { DeleteTransaction, setupDeleteTransaction } from '@/domain/usecases/transaction'
import { makeTransactionRepo } from '@/main/factories/infra/repos'

export const makeDeleteTransaction = (): DeleteTransaction => {
  return setupDeleteTransaction(
    makeTransactionRepo()
  )
}
