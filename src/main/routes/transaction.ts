import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import {
  makeDeleteTransactionController,
  makeGetTransactionController,
  makeShowTransactionController,
  makeGetTransactionByUserController
} from '@/main/factories/application/controllers/transaction'

export default (router: Router): void => {
  router.get('/transactions', auth, adapt(makeGetTransactionController()))
  router.get('/transactions/:id', auth, adapt(makeShowTransactionController()))
  router.get('/transactions-user/:id', auth, adapt(makeGetTransactionByUserController()))
  router.delete('/transactions/:id', auth, adapt(makeDeleteTransactionController()))
}
