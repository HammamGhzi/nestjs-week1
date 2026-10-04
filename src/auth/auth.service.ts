import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthAccount, PublicAuthAccount } from './entities/auth.entity.js';
import { CreateAuthDto } from './dto/create-auth-dto.js';
import { UpdateAuthDto } from './dto/update-auth-dto.js';

@Injectable()
export class AuthService {
	private readonly accounts: AuthAccount[] = [
		{ id: 1, email: 'admin@example.com', password: 'dummy-admin-password' },
		{ id: 2, email: 'member@example.com', password: 'dummy-member-password' },
	];
	private nextId = 3;

	findAll(): PublicAuthAccount[] {
		return this.accounts.map(({ id, email }) => ({ id, email }));
	}

	findById(id: number): PublicAuthAccount {
		const account = this.accounts.find((item) => item.id === id);
		if (!account) throw new NotFoundException(`Account with id ${id} not found`);
		return { id: account.id, email: account.email };
	}

	create(input: CreateAuthDto): PublicAuthAccount {
		const account: AuthAccount = {
			id: this.nextId++,
			email: input.email,
			password: input.password,
		};
		this.accounts.push(account);
		return { id: account.id, email: account.email };
	}

	update(id: number, input: UpdateAuthDto): PublicAuthAccount {
		const account = this.accounts.find((item) => item.id === id);
		if (!account) throw new NotFoundException(`Account with id ${id} not found`);

		Object.assign(account, input);
		return { id: account.id, email: account.email };
	}

	remove(id: number): boolean {
		const accountIndex = this.accounts.findIndex((item) => item.id === id);
		if (accountIndex === -1) throw new NotFoundException(`Account with id ${id} not found`);

		this.accounts.splice(accountIndex, 1);
		return true;
	}
}
