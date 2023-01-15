import { ApiCurrency } from '@/domain/contracts/gateways'
import { InsertTransaction, User } from '../contracts/repos'

type Setup = (api: ApiCurrency, transactionRepo: InsertTransaction) => GetTransactionInformation
type Input = ApiCurrency.Input & {authUserId: string}
type Output = { to: string
  from: string
  amount: number
  amountResult: number
  rate: number
  date: Date
  user?: User} | undefined

export type GetTransactionInformation = (input: Input) => Promise<Output>

export const setupGetTransactionInformation: Setup = (api, transactionRepo) => async ({ to, from, amount, authUserId }) => {
  const response = await api.get({ to, from, amount })
  const transaction = await transactionRepo.insert(Object.assign({}, { to, from, amount }, { amountResult: response.result, rate: response.info.quote, date: new Date(response.info.timestamp), user: { id: parseInt(authUserId) } }))
  return transaction
}
