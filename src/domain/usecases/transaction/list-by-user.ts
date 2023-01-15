import { LoadTransactionByUser } from '@/domain/contracts/repos/transaction'

type Setup = (transactionRepo: LoadTransactionByUser) => ListTransactionByUser
type Input = LoadTransactionByUser.Input
type Output = LoadTransactionByUser.Output

export type ListTransactionByUser = (input: Input) => Promise<Output>

export const setupListTransactionByUser: Setup = (transactionRepo) => async ({ id }) => {
  return await transactionRepo.listByUser({ id })
}
