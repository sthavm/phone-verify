import { Module } from '@nestjs/common';
import { NumberVerificationController } from './number-verification.controller';
import { NumberVerificationService } from './number-verification.service';
import { VerifiedNumber } from './verified-number.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [TypeOrmModule.forFeature([VerifiedNumber]), HttpModule],
  controllers: [NumberVerificationController],
  providers: [NumberVerificationService],
})
export class NumberVerificationModule {}
