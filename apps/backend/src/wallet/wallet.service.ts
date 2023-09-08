import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,

    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const transaction = new Transaction();
    transaction.amount = createWalletDto.balance;
    transaction.description = 'Initial Balance';
    await this.transactionRepository.save(transaction);

    const wallet = new Wallet();
    wallet.balance = createWalletDto.balance;
    wallet.name = createWalletDto.name;
    wallet.transaction = [transaction];
    return this.walletRepository.save(wallet);
  }

  async getAllTransaction(query) {
    const limit = query.limit || 10;
    const skip = query.skip || 0;
    const wallet = await this.walletRepository.findOne({
      where: { id: query.walletId },
    });

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.wallet= :id', { id: query.walletId })
      .limit(limit)
      .skip(skip)
      .getMany();
    return transactions;
  }

  findAll() {
    return `This action returns all wallet`;
  }

  async findOne(id: number) {
    const wallet = await this.walletRepository.findOne({
      where: { id },
    });
    if (!wallet) {
      return {
        error: true,
        message: 'Wallet not found',
      };
    }
    return {
      error: false,
      wallet,
    };
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.walletRepository.findOne({
      where: { id },
      relations: ['transaction'],
    });

    if (!wallet) {
      return {
        error: true,
        message: 'Wallet not found',
      };
    }
    const balance: string = wallet.balance as any;
    const updatedBalance = parseFloat(balance) + updateWalletDto.amount;

    if (updatedBalance < 0) {
      return {
        error: true,
        message: 'Insufficient balance',
      };
    }

    const transaction = new Transaction();
    transaction.amount = updateWalletDto.amount;
    transaction.description = updateWalletDto.description;
    await this.transactionRepository.save(transaction);

    wallet.balance = updatedBalance;
    wallet.transaction = [...(wallet.transaction || []), transaction];
    return {
      error: false,
      wallet: await this.walletRepository.save({
        ...wallet,
      }),
    };
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
