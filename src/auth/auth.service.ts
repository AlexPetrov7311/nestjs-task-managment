import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentionalsDto } from './dto/auth-credentials';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
  }
  
  async singUp(authCredentionalsDto: AuthCredentionalsDto): Promise<void> {
    return this.userRepository.createUser(authCredentionalsDto);
  }

  async signIn(authCredentionalsDto: AuthCredentionalsDto): Promise<string> {
    const { username, password } = authCredentionalsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException();
    }
  }
}
