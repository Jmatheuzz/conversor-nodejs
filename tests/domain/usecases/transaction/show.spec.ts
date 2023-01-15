import { ContentNotFound } from '@/application/errors'
import { ShowTransaction as Show } from '@/domain/contracts/repos'
import { ListTransaction, setupShowTransaction } from '@/domain/usecases/transaction'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Show Transactions', () => {
  let repo: MockProxy<Show>
  let sut: ListTransaction

  beforeAll(() => {
    repo = mock()
    repo.show.mockResolvedValue({
      id: 1,
      to: 'any_to',
      from: 'any_from',
      amount: 10,
      amountResult: 15,
      date: '2022-05-29',
      rate: 1,
      user: { id: 1 },
      createdAt: '2022-03-29',
      updatedAt: '2022-03-29'
    })
  })

  beforeEach(() => {
    sut = setupShowTransaction(repo)
  })

  it('should return a repo', async () => {
    const response = await sut({ id: 'any_id' })

    expect(response).toEqual({
      id: 1,
      to: 'any_to',
      from: 'any_from',
      amount: 10,
      amountResult: 15,
      date: '2022-05-29',
      rate: 1,
      user: { id: 1 },
      createdAt: '2022-03-29',
      updatedAt: '2022-03-29'
    })
  })

  it('should call ListTransactions with correct param', async () => {
    await sut({ id: 'any_id' })

    expect(repo.show).toHaveBeenCalledWith({ id: 'any_id' })
    expect(repo.show).toHaveBeenCalledTimes(1)
  })

  it('should throws if show returns undefined', async () => {
    repo.show.mockResolvedValueOnce(undefined)
    const promise = sut({ id: 'any_id' })
    await expect(promise).rejects.toThrow(new ContentNotFound('transaction'))
  })

  it('should rethrow if show throws', async () => {
    repo.show.mockRejectedValueOnce(new Error('show_error'))
    const promise = sut({ id: 'any_id' })

    await expect(promise).rejects.toThrow(new Error('show_error'))
  })
})
