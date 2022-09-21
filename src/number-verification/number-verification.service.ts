import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VerifiedNumber } from './verified-number.entity';
import { HttpService } from '@nestjs/axios';

@Injectable({})
export class NumberVerificationService {
  readonly apiKey: string = '897hOgJAdn9niIface3RkcQ6zGh7Pprn';
  constructor(
    @InjectRepository(VerifiedNumber)
    private verifiedNumberRepository: Repository<VerifiedNumber>,
    private readonly httpService: HttpService,
  ) {}
  async verify(query: {
    'country-code': string;
    'phone-number': string;
  }): Promise<VerifiedNumber> {
    const numberConcatenated: string =
      (query['country-code'].charAt(0) === ' '
        ? query['country-code'].slice(1)
        : query['country-code']) + query['phone-number'];

    const numberPreviouslyVerified: VerifiedNumber | null =
      await this.verifiedNumberRepository.findOneBy({
        phoneNumber: numberConcatenated,
      });
    if (numberPreviouslyVerified) {
      return numberPreviouslyVerified;
    }
    try {
      const requestOptions = { headers: { apiKey: this.apiKey } };

      const { data } = await this.httpService.axiosRef.get(
        `https://api.apilayer.com/number_verification/validate?number=${numberConcatenated}`,
        requestOptions,
      );

      if (data.valid) {
        const newNumber: VerifiedNumber = new VerifiedNumber();
        newNumber.phoneNumber = data.international_format;
        newNumber.country = data.country_name;
        newNumber.location = data.location;
        newNumber.carrier = data.carrier;
        newNumber.lineType = data.line_type;
        return this.verifiedNumberRepository.save(newNumber);
      } else {
        throw new HttpException(
          'The provided phone number is invalid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        throw new HttpException(
          'The provided phone number is invalid',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
