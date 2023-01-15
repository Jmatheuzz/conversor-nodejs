import { User } from '.'

export type Transaction = {
  id: number
  to: string
  from: string
  amount: number
  amountResult: number
  rate: number
  date: Date | string
  user?: User
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface LoadTransactions {
  get: () => Promise<LoadTransactions.Output>
}

export namespace LoadTransactions {
  export type Output = Transaction[]
}
export interface LoadTransactionByUser {
  listByUser: (input: LoadTransactionByUser.Input) => Promise<LoadTransactionByUser.Output>
}

export namespace LoadTransactionByUser {
  export type Input = { id: number}
  export type Output = Transaction[] | undefined
}
export interface ShowTransaction {
  show: (input: ShowTransaction.Input) => Promise<ShowTransaction.Output>
}

export namespace ShowTransaction {
  export type Input = { id: string }
  export type Output = Transaction | undefined
}

export interface InsertTransaction {
  insert: (input: InsertTransaction.Input) => Promise<InsertTransaction.Output>
}

export namespace InsertTransaction {
  export type Input = {
    to: string
    from: string
    amount: number
    amountResult: number
    rate: number
    date: Date | string
    user?: User
  }
  export type Output = Transaction | undefined
}

export interface DeleteTransaction {
  delete: (input: DeleteTransaction.Input) => Promise<DeleteTransaction.Output>
}

export namespace DeleteTransaction {
  export type Input = { id: string }
  export type Output<T = any> = T
}
