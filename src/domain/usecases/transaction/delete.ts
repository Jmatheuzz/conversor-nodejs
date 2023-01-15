import { DeleteTransaction as Delete } from '@/domain/contracts/repos'

type Setup = (transactionRepo: Delete) => DeleteTransaction
type Input = { id: string }

export type DeleteTransaction = (input: Input) => Promise<void>

export const setupDeleteTransaction: Setup = (transactionRepo) => async input => {
  await transactionRepo.delete(input)
}
