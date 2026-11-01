import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from './books.service.js';
import { Book } from './entities/book.entity.js';

describe('BooksService', () => {
  let service: BooksService;
  let repo: Repository<Book>;

  const mockRepo = {
    find: vi.fn(),
    findOneBy: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
    merge: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(Book), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    repo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
