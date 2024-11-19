import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async resetProblemsFlag(): Promise<number> {
    const usersWithProblems = await this.userRepository.count({
      where: { has_problems: true },
    });
    await this.userRepository.update({ has_problems: true }, { has_problems: false });
    return usersWithProblems;
  }

  async countUsers(): Promise<number> {
    const totalUsers = await this.userRepository.count()
    return totalUsers
  }

  async addUsers(): Promise<{ result: string }> {
    const batchSize = 5000;
    const totalUsers = 1000000;
    let values: Partial<User>[] = [];

    try {
      for (let i = 0; i < totalUsers; i++) {
        values.push({
          first_name: `Name ${i}`,
          last_name: `Surname ${i}`,
          age: Math.floor(Math.random() * 60) + 18,
          gender: 'M',
          has_problems: Math.random() > 0.7
        })

        if (values.length === batchSize) {
          await this.userRepository.insert(values as User[]);
          console.log('Users added: ', i + 1)
          values = [];
        }
      }

      if (values.length > 0) {
        await this.userRepository.insert(values as User[]);
      }
      return { result: 'Users added' }
    } catch (error) {
      return { result: `Error: ${error}` }
    }
  }

  async removeUsers(): Promise<{ result: string }> {
    try {
      const r = await this.userRepository.delete({})
      return { result: 'Users removedd' }
    } catch (error) {
      return { result: `Error: ${error}` }
    }
  }
}
