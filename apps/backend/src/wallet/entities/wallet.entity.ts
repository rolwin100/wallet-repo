import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { scale: 4 })
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transaction: Transaction[];

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'now()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'now()',
  })
  public updatedAt: Date;
}
