import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCredentionalsDto } from './dto/auth-credentials';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    @Post('/signup')
    signUp(@Body() authCredentionalsDto: AuthCredentionalsDto): Promise<void> {
        return this.authService.singUp(authCredentionalsDto);
    }

    @Post('/signin')
    signin(@Body() authCredentionalsDto: AuthCredentionalsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentionalsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req): void {
        console.log(req)
    }
}
