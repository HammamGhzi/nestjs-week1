import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Member } from './entities/member.entity.js';
import { CreateMemberDto } from './dto/create-members-dto.js';
import { UpdateMemberDto } from './dto/update-members-dto.js';

@Injectable()
export class MembersService {
  // wajib memakai new Member(...) agar decorator class-transformer aktif
  private readonly members: Member[] = [
    new Member({ id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password123' }),
    new Member({ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0987654321', password: 'password456' }),
  ];

  findAll(): Member[] {
    return this.members;
  }

  findById(id: number): Member {
    const member = this.members.find((item) => item.id === id);
    if (!member) throw new NotFoundException(`Member with id ${id} not found`);
    return member;
  }

  create(input: CreateMemberDto): Member {
    if (this.members.some((item) => item.email === input.email)) {
      throw new ConflictException(`Alamat email ${input.email} sudah digunakan.`);
    }
    const member = new Member({
      id: this.members.length ? Math.max(...this.members.map((item) => item.id)) + 1 : 1,
      ...input,
    });
    this.members.push(member);
    return member;
  }

  update(id: number, input: UpdateMemberDto): Member {
    const member = this.findById(id);
    // abaikan field undefined agar tidak menimpa data lama
    Object.assign(
      member,
      Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined)),
    );
    return member;
  }

  remove(id: number): boolean {
    const index = this.members.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Member with id ${id} not found`);
    this.members.splice(index, 1);
    return true;
  }
}
