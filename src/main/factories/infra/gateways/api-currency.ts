import { ApiCurrencyHandler } from '@/infra/gateways'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '.'

export const makeApiCurrencyHandler = (): ApiCurrencyHandler => {
  return new ApiCurrencyHandler(env.apiCurrency.url, env.apiCurrency.apiKey, makeAxiosHttpClient())
}
