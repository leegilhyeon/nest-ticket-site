import { Repository } from "typeorm";
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
    async createUser(authDto: AuthDto): Promise<void> {
        const { name, email, password } = authDto;

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = this.create({ name, email, password: hashedPassword});
    try{
        await this.save(user);
    } catch(error) {
        if(error.code === '23505') {
            throw new ConflictException('Existing name or email')
        } else {
            throw new InternalServerErrorException();
        }
    }
       }
    }