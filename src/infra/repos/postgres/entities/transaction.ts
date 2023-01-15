import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from '.'

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  to!: string

  @Column()
  from!: string

  @Column()
  amount!: number

  @Column({ name: 'amount_result' })
  amountResult!: number

  @Column()
  rate!: number

  @Column({ name: 'date' })
  date!: Date

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  @ManyToOne(() => User, user => user.transactions, { lazy: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User
}
