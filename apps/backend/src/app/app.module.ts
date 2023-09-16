import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from 'src/wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Transaction } from 'src/wallet/entities/transaction.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'test',
      entities: [Wallet, Transaction],
      synchronize: true,
      ssl: !!process.env.DB_SSL,
    }),
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
