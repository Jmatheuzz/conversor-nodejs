import { GetTransactionInformation, setupGetTransactionInformation } from '@/domain/usecases'
import { makeApiCurrencyHandler } from '@/main/factories/infra/gateways'
import { makeTransactionRepo } from '../../infra/repos'

export const makeGetTransactionInformation = (): GetTransactionInformation => {
  return setupGetTransactionInformation(
    makeApiCurrencyHandler(),
    makeTransactionRepo()
  )
}
