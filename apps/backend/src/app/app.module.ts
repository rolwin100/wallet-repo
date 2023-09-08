import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from 'src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Transaction } from 'src/wallet/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cjtdfc5htt0c73c6r8p0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'wallet_wehx_user',
      password: 'CqJ1jGWCTtagF7HKXVsSCoRNRKZs5BZk',
      database: 'wallet_wehx',
      entities: [Wallet, Transaction],
      synchronize: true,
    }),
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
