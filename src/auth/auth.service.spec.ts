import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates and returns account data without the password', () => {
    const account = service.create({
      email: 'reader@example.com',
      password: 'secret123',
    });

    expect(account).toEqual({ id: 1, email: 'reader@example.com' });
    expect(service.findAll()).toEqual([account]);
    expect(service.findById(account.id)).toEqual(account);
  });

  it('updates and removes an account', () => {
    const account = service.create({
      email: 'reader@example.com',
      password: 'secret123',
    });

    expect(service.update(account.id, { email: 'updated@example.com' })).toEqual({
      id: account.id,
      email: 'updated@example.com',
    });
    expect(service.remove(account.id)).toBe(true);
    expect(service.findById(account.id)).toBeUndefined();
    expect(service.remove(account.id)).toBe(false);
  });
});
