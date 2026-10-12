import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { AuthAccount, PublicAuthAccount } from './entities/auth.entity.js';
import { CreateAuthDto } from './dto/create-auth-dto.js';
import { LoginAuthDto } from './dto/login-auth-dto.js';
import { UpdateAuthDto } from './dto/update-auth-dto.js';

@Injectable()
export class AuthService {
	private readonly accounts: AuthAccount[] = [
		{ id: 1, email: 'admin@example.com', password: this.hashPassword('dummy-admin-password') },
		{ id: 2, email: 'member@example.com', password: this.hashPassword('dummy-member-password') },
	];
	private nextId = 3;

	private hashPassword(password: string): string {
		const salt = randomBytes(16).toString('hex');
		const hash = scryptSync(password, salt, 64).toString('hex');
		return `${salt}:${hash}`;
	}

	private passwordMatches(password: string, storedPassword: string): boolean {
		const [salt, storedHash] = storedPassword.split(':');
		if (!salt || !storedHash) return false;

		const expected = Buffer.from(storedHash, 'hex');
		const actual = scryptSync(password, salt, expected.length);
		return expected.length === actual.length && timingSafeEqual(expected, actual);
	}

	findAll(): PublicAuthAccount[] {
		return this.accounts.map(({ id, email }) => ({ id, email }));
	}

	findById(id: number): PublicAuthAccount {
		const account = this.accounts.find((item) => item.id === id);
		if (!account) throw new NotFoundException(`Account with id ${id} not found`);
		return { id: account.id, email: account.email };
	}

	register(input: CreateAuthDto): PublicAuthAccount {
		const email = input.email.trim().toLowerCase();
		if (this.accounts.some((account) => account.email.toLowerCase() === email)) {
			throw new ConflictException('Email is already registered');
		}

		const account: AuthAccount = {
			id: this.nextId++,
			email,
			password: this.hashPassword(input.password),
		};
		this.accounts.push(account);
		return { id: account.id, email: account.email };
	}

	login(input: LoginAuthDto): PublicAuthAccount {
		const email = input.email.trim().toLowerCase();
		const account = this.accounts.find((item) => item.email.toLowerCase() === email);
		if (!account || !this.passwordMatches(input.password, account.password)) {
			throw new UnauthorizedException('Invalid email or password');
		}
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
