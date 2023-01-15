import { ApiCurrencyController } from '@/application/controllers/api-currency-controller'
import { makeGetTransactionInformation } from '@/main/factories/domain/usecases'

export const makeApiCurrencyController = (): ApiCurrencyController => {
  return new ApiCurrencyController(makeGetTransactionInformation())
}
