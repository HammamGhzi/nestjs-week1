import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { Member } from './entities/member.entity.js';

@Injectable()
export class MembersService {
  private readonly members: Member[] = [];
  private nextId = 1;

  create(createMemberDto: CreateMemberDto): Member {
    const member: Member = {
      id: this.nextId++,
      fullName: createMemberDto.fullName,
      email: createMemberDto.email,
      phoneNumber: createMemberDto.phoneNumber,
      isActive: createMemberDto.isActive ?? true,
    };
    this.members.push(member);
    return member;
  }

  findAll(): Member[] {
    return this.members;
  }

  findOne(id: number): Member {
    const member = this.members.find((item) => item.id === id);
    if (!member) throw new NotFoundException(`Anggota dengan id ${id} tidak ditemukan`);
    return member;
  }

  update(id: number, updateMemberDto: UpdateMemberDto): Member {
    const member = this.findOne(id);
    Object.assign(member, updateMemberDto);
    return member;
  }

  remove(id: number): void {
    const member = this.findOne(id);
    this.members.splice(this.members.indexOf(member), 1);
  }
}
