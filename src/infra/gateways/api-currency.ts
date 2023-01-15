import { ApiCurrency } from '@/domain/contracts/gateways'
import { HttpGetClient } from './client'

export class ApiCurrencyHandler implements ApiCurrency {
  constructor (
    private readonly url: string,
    private readonly apiKey: string,
    private readonly axios: HttpGetClient
  ) {}

  async get ({ to, from, amount }: ApiCurrency.Input): Promise<ApiCurrency.Output> {
    return await this.axios.get({ url: `${this.url}?to=${to}&from=${from}&amount=${amount}`, params: { apikey: this.apiKey } })
  }
}
