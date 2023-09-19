import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentionalsDto } from './dto/auth-credentials';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwy-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
  }
  
  async singUp(authCredentionalsDto: AuthCredentionalsDto): Promise<void> {
    return this.userRepository.createUser(authCredentionalsDto);
  }

  async signIn(authCredentionalsDto: AuthCredentionalsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentionalsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username }
      const accessToken: string = this.jwtService.sign(payload);
      return {
        accessToken
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
