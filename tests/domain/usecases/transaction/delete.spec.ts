import { DeleteTransaction as Delete, ShowTransaction as Show } from '@/domain/contracts/repos'
import { DeleteTransaction, setupDeleteTransaction } from '@/domain/usecases/transaction'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Delete Transactions', () => {
  let repo: MockProxy<Delete & Show>
  let sut: DeleteTransaction

  beforeAll(() => {
    repo = mock()
  })

  beforeEach(() => {
    sut = setupDeleteTransaction(repo)
  })

  it('should call DeleteTransaction with correct param', async () => {
    await sut({ id: 'any_id' })

    expect(repo.delete).toHaveBeenCalledWith({ id: 'any_id' })
    expect(repo.delete).toHaveBeenCalledTimes(1)
  })

  it('should return', async () => {
    const response = await sut({ id: 'any_id' })

    expect(response).toBeUndefined()
  })

  it('should rethrow if delete throws', async () => {
    repo.delete.mockRejectedValueOnce(new Error('delete_error'))
    const promise = sut({ id: 'any_id' })

    await expect(promise).rejects.toThrow(new Error('delete_error'))
  })
})
