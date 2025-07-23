import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { RegisterDto } from 'src/dto/regDto';
import { LoginDto } from 'src/dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const candidate = await this.userService.findByEmail(dto.email);
    if (candidate) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });
    const token = this.generateToken(user);
    return {message:"Registered",user,token}
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return this.generateToken(user);
  }

  private generateToken(user: any) {
    const payload = { id: user._id, email: user.email };
    return {
      token: this.jwtService.sign(payload),
      payload
    };
  }
}
