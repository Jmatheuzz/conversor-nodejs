import { ShowTransactionController } from '@/application/controllers/transaction'
import { makeShowTransaction } from '@/main/factories/domain/usecases/transaction'

import { makeLogController } from '@/main/factories/application/decorators'
import { Controller } from '@/application/controllers'

export const makeShowTransactionController = (): Controller => {
  const controller = new ShowTransactionController(makeShowTransaction())
  return makeLogController(controller)
}
