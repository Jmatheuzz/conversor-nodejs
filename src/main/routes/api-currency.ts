import { Router } from 'express'
import { makeApiCurrencyController } from '@/main/factories/application/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/api-currency/', auth, adapt(makeApiCurrencyController()))
}
