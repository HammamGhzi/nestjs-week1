import { Exclude } from 'class-transformer';

export class Member {
  id: number;
  name: string;
  email: string;
  phone: string;

  // Field rahasia yang di-exclude dari serialisasi respons
  @Exclude()
  password: string;

  constructor(partial: Partial<Member>) {
    Object.assign(this, partial);
  }
}
