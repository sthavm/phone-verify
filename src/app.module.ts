import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifiedNumber } from './number-verification/verified-number.entity';

import { NumberVerificationModule } from './number-verification/number-verification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'verifiedNumbers',
      entities: [VerifiedNumber],
      synchronize: true,
    }),
    NumberVerificationModule,
  ],
})
export class AppModule {}
