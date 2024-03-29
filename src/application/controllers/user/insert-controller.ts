import { ValidationBuilder as builder, Validator } from '@/application/validation'
import { HttpResponse, badRequest, created } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { InsertUser } from '@/domain/usecases/user'

import { InsertUser as Save, User as IUser } from '@/domain/contracts/repos'
import { User } from '@/infra/repos/postgres/entities'

type HttpRequest = Save.Input & { passwordConfirmation: string }

type Model = Error | IUser
export class InsertUserController extends Controller {
  constructor (private readonly insertUser: InsertUser) {
    super()
  }

  async perform (httpRequest: Save.Input): Promise<HttpResponse<Model>> {
    try {
      const user = await this.insertUser(httpRequest)
      return created(user)
    } catch (error: any) {
      return badRequest(new Error(error.message))
    }
  }

  override async buildValidators ({ name, email, password, passwordConfirmation }: HttpRequest): Promise<Validator[]> {
    return [
      ...builder.of({ value: password, fieldName: 'password' }).required().between(8, 20).password(passwordConfirmation).build(),
      ...builder.of({ value: name, fieldName: 'name' }).required().build(),
      ...(await builder.of({ value: email, fieldName: 'email' }).required().email().unique(User)).build()
    ]
  }
}
