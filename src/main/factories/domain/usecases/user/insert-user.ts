import { InsertUser, setupInsertUser } from '@/domain/usecases/user'
import { makeBcryptHandler } from '@/main/factories/infra/gateways'
import { makeUserRepo } from '@/main/factories/infra/repos'

export const makeInsertUser = (): InsertUser => {
  return setupInsertUser(
    makeUserRepo(),
    makeBcryptHandler()
  )
}
