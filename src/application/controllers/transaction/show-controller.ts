import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, ok, contentNotFound } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ListTransaction } from '@/domain/usecases/transaction'
import { Transaction } from '@/domain/contracts/repos'

type HttpRequest = { id: string }

type Model = Error | Transaction
export class ShowTransactionController extends Controller {
  constructor (private readonly showTransaction: ListTransaction) {
    super()
  }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const transaction = await this.showTransaction({ id })
      return ok(transaction)
    } catch {
      return contentNotFound('transaction')
    }
  }

  override async buildValidators ({ id }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: id, fieldName: 'id' }).required().build()
    ]
  }
}
