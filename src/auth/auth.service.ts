import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentionalsDto } from './dto/auth-credentials';

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
}
