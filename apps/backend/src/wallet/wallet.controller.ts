import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { TransactionDto } from './dto/transcations.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/setup')
  async create(@Res() res, @Body() createWalletDto: CreateWalletDto) {
    try {
      console.log(createWalletDto);
      const wallet = await this.walletService.create(createWalletDto);
      return res.status(HttpStatus.CREATED).send({
        status: 'success',
        message: 'Wallet created successfully',
        data: {
          id: wallet.id,
          name: wallet.name,
          balance: wallet.balance,
          transactionId: wallet.transaction[0].id,
          date: wallet.createdAt,
        },
      });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: 'error',
        message: err.message,
      });
    }
  }

  @Get('/transactions')
  async getAllTransaction(@Res() res, @Query() query: TransactionDto) {
    try {
      const result = await this.walletService.getAllTransaction(query);
      return res.status(HttpStatus.OK).send({
        status: 'success',
        message: 'Transactions retrieved successfully',
        data: result.transactions,
        count: result.transactionsCount,
      });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: 'error',
        message: err.message,
      });
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const wallet = await this.walletService.findOne(+id);

      if (wallet?.error) {
        throw new Error('Wallet not found');
      }

      return res.status(HttpStatus.OK).send({
        status: 'success',
        message: 'Wallet retrieved successfully',
        data: {
          id: wallet.wallet.id,
          name: wallet.wallet.name,
          balance: wallet.wallet.balance,
          date: wallet.wallet.createdAt,
        },
      });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: 'error',
        message: err.message,
      });
    }
  }

  @Patch(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    try {
      const result = await this.walletService.update(+id, updateWalletDto);

      if (result?.error) {
        throw new Error(result.message);
      }

      return res.status(HttpStatus.OK).send({
        status: 'success',
        message: 'Wallet updated successfully',
        data: result.wallet,
      });
    } catch (err) {
      console.log(err);
      return res.status(HttpStatus.NOT_FOUND).send({
        status: 'error',
        message: err.message,
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
