import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, badRequest, noContent } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { DeleteTransaction } from '@/domain/usecases/transaction'

type HttpRequest = { id: string }

type Model = Error | any
export class DeleteTransactionController extends Controller {
  constructor (private readonly deleteTransaction: DeleteTransaction) {
    super()
  }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      await this.deleteTransaction({ id })
      return noContent()
    } catch (error: any) {
      return badRequest(new Error(error.message))
    }
  }

  override async buildValidators ({ id }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: id, fieldName: 'id' }).required().build()
    ]
  }
}
