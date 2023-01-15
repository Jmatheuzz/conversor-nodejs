import { ListTransaction, setupShowTransaction } from '@/domain/usecases/transaction'
import { makeTransactionRepo } from '@/main/factories/infra/repos'

export const makeShowTransaction = (): ListTransaction => {
  return setupShowTransaction(
    makeTransactionRepo()
  )
}
