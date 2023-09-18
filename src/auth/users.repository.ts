import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentionalsDto } from './dto/auth-credentials';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentionalsDto: AuthCredentionalsDto): Promise<void> {
    const { username, password } = authCredentionalsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        // duplicate code
        throw new ConflictException('Username alredy exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
