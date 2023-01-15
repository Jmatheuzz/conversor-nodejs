import { LoadTransactions as List } from '@/domain/contracts/repos'
import { ListTransactions, setupListTransactions } from '@/domain/usecases/transaction'
import { mock, MockProxy } from 'jest-mock-extended'

describe('List Transaction', () => {
  let repo: MockProxy<List>
  let sut: ListTransactions

  beforeAll(() => {
    repo = mock()
    repo.get.mockResolvedValue([])
  })

  beforeEach(() => {
    sut = setupListTransactions(repo)
  })

  it('should call ListTransaction with correct param', async () => {
    await sut()
    expect(repo.get).toHaveBeenCalledWith()
    expect(repo.get).toHaveBeenCalledTimes(1)
  })

  it('should return a list', async () => {
    const response = await sut()
    expect(response).toEqual([])
  })

  it('should return empty if repo is not found', async () => {
    repo.get.mockResolvedValueOnce([])
    const response = await sut()
    expect(response).toEqual([])
  })

  it('should rethrow if load throws', async () => {
    repo.get.mockRejectedValueOnce(new Error('list_error'))
    const promise = sut()
    await expect(promise).rejects.toThrow(new Error('list_error'))
  })
})
