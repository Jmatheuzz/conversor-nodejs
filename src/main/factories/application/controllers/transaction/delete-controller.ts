import { DeleteTransactionController } from '@/application/controllers/transaction'
import { makeDeleteTransaction } from '@/main/factories/domain/usecases/transaction'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeDeleteTransactionController = (): Controller => {
  const controller = new DeleteTransactionController(makeDeleteTransaction())
  return makeLogController(controller)
}
