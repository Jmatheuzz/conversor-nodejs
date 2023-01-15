import { LoadTransactions } from '@/domain/contracts/repos/transaction'

type Setup = (transactionRepo: LoadTransactions) => ListTransactions
type Output = LoadTransactions.Output

export type ListTransactions = () => Promise<Output>

export const setupListTransactions: Setup = (transactionRepo) => async () => {
  return await transactionRepo.get()
}
