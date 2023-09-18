import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentionalsDto } from './dto/auth-credentials';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    @Post('/signup')
    signUp(@Body() authCredentionalsDto: AuthCredentionalsDto): Promise<void> {
        return this.authService.singUp(authCredentionalsDto);
    }
}
