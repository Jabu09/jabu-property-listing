import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'email' })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'password' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
