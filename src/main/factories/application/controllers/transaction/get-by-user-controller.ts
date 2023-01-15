import { GetTransactionByUserController } from '@/application/controllers/transaction'
import { makeGetTransactionByUser } from '@/main/factories/domain/usecases/transaction'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeGetTransactionByUserController = (): Controller => {
  const controller = new GetTransactionByUserController(makeGetTransactionByUser())
  return makeLogController(controller)
}
