import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { GetTransactionInformation } from '@/domain/usecases'
import { User } from '@/domain/contracts/repos'

type HttpRequest = {
  to: string
  from: string
  amount: number
  authUserId: string
  apiKey: string}

type Model = Error | { to: string
  from: string
  amount: number
  amountResult: number
  rate: number
  date: Date
  user?: User} | undefined
export class ApiCurrencyController extends Controller {
  constructor (private readonly getAddressInformation: GetTransactionInformation) {
    super()
  }

  async perform ({ to, from, amount, authUserId }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const addressInformation = await this.getAddressInformation({ to, from, amount, authUserId })
      return ok(addressInformation)
    } catch (err: any) {
      return badRequest(err)
    }
  }

  override async buildValidators ({ to, from, amount }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: to, fieldName: 'to' }).required().build(),
      ...builder.of({ value: from, fieldName: 'from' }).required().build(),
      ...builder.of({ value: amount, fieldName: 'amount' }).required().build()
    ]
  }
}
