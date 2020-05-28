import { Controller, UseGuards, Request, Post } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ApiOperation({ 
        summary: 'Get token', 
        description: 'Verifica se o username e password passados no body correspondem à alguma linha no db. Se sim, ele retorna um token que deve ser utilizado para procedimentos na aplicação adicionando um Header nomeado de Authorization e com o valor "Bearer {token_recebido}".' })
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}