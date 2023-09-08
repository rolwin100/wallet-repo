import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal', { scale: 4 })
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.transaction)
  wallet: Wallet;

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
