export interface ApiCurrency {
  get: (input: ApiCurrency.Input) => Promise<ApiCurrency.Output>
}

export namespace ApiCurrency {
  export type Input = { to: string, from: string, amount: number}
  export type Output = {
    info: {timestamp: number, quote: number}
    result: number}
}
