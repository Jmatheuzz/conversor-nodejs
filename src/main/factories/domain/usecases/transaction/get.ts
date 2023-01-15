import { ListTransactions, setupListTransactions } from '@/domain/usecases/transaction'
import { makeTransactionRepo } from '@/main/factories/infra/repos'

export const makeGetTransaction = (): ListTransactions => {
  return setupListTransactions(
    makeTransactionRepo()
  )
}
