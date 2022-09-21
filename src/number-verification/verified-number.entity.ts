import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VerifiedNumber {
  @PrimaryGeneratedColumn()
  phoneNumber: string;

  @Column()
  country: string;

  @Column()
  location: string;

  @Column()
  carrier: string;

  @Column()
  lineType: string;
}
