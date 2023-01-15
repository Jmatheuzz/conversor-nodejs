import { DeleteTransactionController } from '@/application/controllers/transaction'
import { RequiredString } from '@/application/validation'
import { ShowTransaction } from '@/domain/contracts/repos'

describe('DeleteTransactionController', () => {
  let sut: DeleteTransactionController
  let deleteTransaction: jest.Mock
  let data: ShowTransaction.Input

  beforeAll(() => {
    data = { id: 'any_id' }
    deleteTransaction = jest.fn()
  })

  beforeEach(() => {
    sut = new DeleteTransactionController(deleteTransaction)
  })

  it('should build validators correctly', async () => {
    const validators = await sut.buildValidators(data)
    expect(validators).toEqual([
      new RequiredString('any_id', 'id')
    ])
  })

  it('should call deleteTransaction with correct params', async () => {
    await sut.handle(data)

    expect(deleteTransaction).toHaveBeenCalledWith(data)
    expect(deleteTransaction).toHaveBeenCalledTimes(1)
  })

  it('should return 400 if deleteuser throws', async () => {
    deleteTransaction.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error()
    })
  })

  it('should return 200 if deleteTransaction succeeds', async () => {
    const httpResponse = await sut.handle(data)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: ''
    })
  })
})
