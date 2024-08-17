import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/create")
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get("/all")
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
