import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (user) throw new ConflictException("O email já está em uso!")

    return this.prisma.user.create({
      data
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })

    if (user) {
      await this.prisma.user.delete({
        where: { id },
      });
    } else {
      throw new NotFoundException("O usuário não existe e não pode ser deletado")
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
