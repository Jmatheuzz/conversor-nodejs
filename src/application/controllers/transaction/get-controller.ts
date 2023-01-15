import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ListTransactions } from '@/domain/usecases/transaction'
import { Transaction } from '@/domain/contracts/repos'

type Model = Error | Transaction[]
export class GetTransactionController extends Controller {
  constructor (private readonly listTransactions: ListTransactions) {
    super()
  }

  async perform (): Promise<HttpResponse<Model>> {
    try {
      const transactions = await this.listTransactions()
      return ok(transactions)
    } catch (error: any) {
      return badRequest(error)
    }
  }
}
