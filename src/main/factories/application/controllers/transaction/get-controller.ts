import { GetTransactionController } from '@/application/controllers/transaction'
import { makeGetTransaction } from '@/main/factories/domain/usecases/transaction'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeGetTransactionController = (): Controller => {
  const controller = new GetTransactionController(makeGetTransaction())
  return makeLogController(controller)
}
