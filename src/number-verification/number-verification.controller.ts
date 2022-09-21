import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NumberVerificationService } from './number-verification.service';

@Controller()
export class NumberVerificationController {
  constructor(private verificationService: NumberVerificationService) {}

  @Get('verify')
  async verify(
    @Query() query: { 'country-code': string; 'phone-number': string },
  ) {
    if (!query['country-code'] || !query['country-code']) {
      throw new HttpException(
        'Please provide the country prefix and phone number',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.verificationService.verify(query);
  }
}
