# **Phone number verification API in NestJS**

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## API Request Format

Verification requests must include a country prefix and a phone number

To make a request,

```bash
GET /verify?country-code={COUNTRY_CODE}&phone-number={PHONE_NUMBER}
```

## API Response Format

Responses are delivered in JSON

For example,

```bash
{"phoneNumber":85257254869,"country":"Hong Kong, China","location":"","carrier":"SmarTone Mobile Communications Ltd (SmarTone)","lineType":"mobile"}
```
