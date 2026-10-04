import { Injectable, NotFoundException } from '@nestjs/common';
import { Member, PublicMember } from './entities/member.entity.js';
import { CreateMemberDto } from './dto/create-members-dto.js';
import { UpdateMemberDto } from './dto/update-members-dto.js';

@Injectable()
export class MembersService {
  private readonly members: Member[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', password: 'password123' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0987654321', password: 'password456' },
  ];

  private toPublicMember({ password: _password, ...member }: Member): PublicMember {
    return member;
  }

  findAll(): PublicMember[] {
    return this.members.map((member) => this.toPublicMember(member));
  }

  findById(id: number): PublicMember {
    const member = this.members.find((item) => item.id === id);
    if (!member) throw new NotFoundException(`Member with id ${id} not found`);
    return this.toPublicMember(member);
  }

  create(input: CreateMemberDto): PublicMember {
    const member: Member = {
      id: this.members.length ? Math.max(...this.members.map((item) => item.id)) + 1 : 1,
      ...input,
    };
    this.members.push(member);
    return this.toPublicMember(member);
  }

  update(id: number, input: UpdateMemberDto): PublicMember {
    const member = this.members.find((item) => item.id === id);
    if (!member) throw new NotFoundException(`Member with id ${id} not found`);
    Object.assign(member, input);
    return this.toPublicMember(member);
  }

  remove(id: number): boolean {
    const index = this.members.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException(`Member with id ${id} not found`);
    this.members.splice(index, 1);
    return true;
  }
}
