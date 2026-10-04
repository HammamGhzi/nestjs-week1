export class AuthAccount {
  id: number;
  email: string;
  password: string;
}

export type PublicAuthAccount = Omit<AuthAccount, 'password'>;