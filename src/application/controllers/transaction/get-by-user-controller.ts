import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ListTransactionByUser } from '@/domain/usecases/transaction'
import { Transaction } from '@/domain/contracts/repos'

type HttpRequest = {id: number}
type Model = Error | Transaction[] | undefined
export class GetTransactionByUserController extends Controller {
  constructor (private readonly listTransactions: ListTransactionByUser) {
    super()
  }

  async perform ({ id }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const transactions = await this.listTransactions({ id })
      return ok(transactions)
    } catch (error: any) {
      return badRequest(error)
    }
  }
}
