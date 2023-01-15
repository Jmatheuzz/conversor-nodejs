import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import {
  makeUpdateUserController,
  makeDeleteUserController,
  makeGetUserController,
  makeShowUserController,
  makeInsertUserController,
  makeLoggedUserController
} from '@/main/factories/application/controllers/user'

export default (router: Router): void => {
  router.get('/users', auth, adapt(makeGetUserController()))
  router.get('/users/me', auth, adapt(makeLoggedUserController()))
  router.post('/users/me', auth, adapt(makeLoggedUserController()))
  router.get('/users/:id', auth, adapt(makeShowUserController()))
  router.post('/users', auth, adapt(makeInsertUserController()))
  router.put('/users/:id', auth, adapt(makeUpdateUserController()))
  router.delete('/users/:id', auth, adapt(makeDeleteUserController()))
}
