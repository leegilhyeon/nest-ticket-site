import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthDto { 
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(10)
    name: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(20)
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '비밀번호는 영어와 숫자로만 작성해주세요.'
    })
    password: string;
}