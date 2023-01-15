import { ShowTransactionController } from '@/application/controllers/transaction'
import { ContentNotFound } from '@/application/errors'
import { RequiredString } from '@/application/validation'
import { ShowTransaction } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'

describe('ShowTransactionController', () => {
  let sut: ShowTransactionController
  let listTransaction: jest.Mock
  let data: ShowTransaction.Input

  beforeAll(() => {
    data = { id: 'any_id' }
    listTransaction = jest.fn()
    listTransaction.mockResolvedValue({ transaction: 'any_transaction' })
  })

  beforeEach(() => {
    sut = new ShowTransactionController(listTransaction)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators(data)
    expect(validators).toEqual([
      new RequiredString('any_id', 'id')
    ])
  })

  it('should call ListTransaction with correct params', async () => {
    await sut.handle(data)

    expect(listTransaction).toHaveBeenCalledWith(data)
    expect(listTransaction).toHaveBeenCalledTimes(1)
  })

  it('should return 404 if no transaction are not found', async () => {
    listTransaction.mockRejectedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 404,
      data: new ContentNotFound('transaction')
    })
  })

  it('should return 200 if listTransaction succeeds', async () => {
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        transaction: 'any_transaction'
      }
    })
  })
})
