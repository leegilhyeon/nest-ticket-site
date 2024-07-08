import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authDto: AuthDto): Promise<void> {
    return await this.userRepository.createUser(authDto);
  }

  async signIn(authDto: AuthDto): Promise<string> {
    const { name, email, password} = authDto;
    const user = await this.userRepository.findOne({ name });

    if(user && (await bcrypt.compare(password, user.password)) && email === user.email) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed')
  }
}
}