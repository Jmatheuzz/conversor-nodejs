import { ContentNotFound } from '@/application/errors'
import { ShowTransaction, Transaction } from '@/domain/contracts/repos'

type Setup = (transactionRepo: ShowTransaction) => ListTransaction
type Input = { id: string }
type Output = Transaction

export type ListTransaction = (input: Input) => Promise<Output>

export const setupShowTransaction: Setup = (transactionRepo) => async input => {
  const transaction = await transactionRepo.show(input)
  if (transaction !== undefined) return transaction
  throw new ContentNotFound('transaction')
}
