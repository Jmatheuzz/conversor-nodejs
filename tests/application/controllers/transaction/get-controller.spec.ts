import { GetTransactionController } from '@/application/controllers/transaction'

describe('GetTransactionController', () => {
  let sut: GetTransactionController
  let getTransaction: jest.Mock

  beforeAll(() => {
    getTransaction = jest.fn()
    getTransaction.mockResolvedValue({ data: 'any_value' })
  })

  beforeEach(() => {
    sut = new GetTransactionController(getTransaction)
  })

  it('should call ListTransactions with correct params', async () => {
    await sut.perform()

    expect(getTransaction).toHaveBeenCalledWith()
    expect(getTransaction).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if ListTransactions succeeds', async () => {
    const httpResponse = await sut.perform()

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        data: 'any_value'
      }
    })
  })

  it('should return 400 if getBannerHome throws', async () => {
    getTransaction.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error()
    })
  })
})
