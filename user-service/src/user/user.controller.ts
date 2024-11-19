import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Patch('reset')
  async resetProblems(): Promise<{ users: number }> {
    const count = await this.userService.resetProblemsFlag();
    return { users: count };
  }

  @Get()
  async getUsers(): Promise<{ total: number }> {
    const users = await this.userService.countUsers()
    return { total: users }
  }

  @Post()
  async createUsers(): Promise<{ result: string }> {
    const result = await this.userService.addUsers()
    return result
  }

  @Delete()
  async deleteUsers(): Promise<{ result: string }> {
    const result = await this.userService.removeUsers()
    return result
  }
}
