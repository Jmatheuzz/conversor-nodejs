import { ListTransactionByUser, setupListTransactionByUser } from '@/domain/usecases/transaction'
import { makeTransactionRepo } from '@/main/factories/infra/repos'

export const makeGetTransactionByUser = (): ListTransactionByUser => {
  return setupListTransactionByUser(
    makeTransactionRepo()
  )
}
