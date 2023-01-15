import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { TransactionRepository } from '@/infra/repos/postgres'
import { Log, Transaction as Repo, User } from '@/infra/repos/postgres/entities'
import { Transaction, User as IUser } from '@/domain/contracts/repos'

describe('TransactionRepository', () => {
  let sut: TransactionRepository
  let TransactionRepo: Repository<Repo>
  let UserRepo: Repository<User>
  let backup: IBackup

  const makeFakeTransaction = (): Transaction => ({
    id: 1,
    to: 'any_to',
    from: 'any_from',
    amount: 10,
    amountResult: 15,
    date: new Date(),
    rate: 1,
    user: { id: 1 },
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const makeFakeUser = (): IUser => ({
    id: 1,
    email: 'any_email',
    password: 'any_password',
    name: 'any_user',
    admin: false
  })

  beforeAll(async () => {
    const db = await makeFakeDb([Repo, Log])
    backup = db.backup()
    TransactionRepo = getRepository(Repo)
    UserRepo = getRepository(User)
  })

  beforeEach(async () => {
    backup.restore()
    sut = new TransactionRepository()
    await UserRepo.save(makeFakeUser() as any)
    await TransactionRepo.save(makeFakeTransaction() as any)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('List', () => {
    it('should return transactions', async () => {
      const account = await sut.get()
      expect(account).toHaveLength(1)
    })

    it('should return undefined if transactions table are empty', async () => {
      backup.restore()
      const transactions = await sut.get()
      expect(transactions).toEqual([])
    })
  })

  describe('Show', () => {
    it('should return an transaction if id exists', async () => {
      const transaction = await sut.show({ id: '1' })
      expect(transaction?.id).toBe(1)
    })

    it('should return undefined if transaction does not exists on show', async () => {
      const transaction = await sut.show({ id: '0' })
      expect(transaction).toBeUndefined()
    })
  })
  describe('Delete', () => {
    it('should delete an transaction if id exists', async () => {
      await sut.delete({ id: '1' })
      const transaction = await sut.show({ id: '1' })
      expect(transaction).toBeUndefined()
    })

    it('should return undefined if transaction does not exists on delete function', async () => {
      const transaction = await sut.delete({ id: '0' })
      expect(transaction).toBeUndefined()
    })
  })

  describe('Create', () => {
    it('should create an transaction if id is undefined', async () => {
      await sut.insert({
        to: 'any_to',
        from: 'any_from',
        amount: 10,
        amountResult: 15,
        date: new Date(),
        rate: 1,
        user: { id: 1 }
      })
      const Transaction = await TransactionRepo.count()
      expect(Transaction).toBe(2)
    })
  })
})
