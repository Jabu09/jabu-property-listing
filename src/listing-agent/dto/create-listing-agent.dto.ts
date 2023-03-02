import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, isPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateListingAgentDto {
  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: '_id' })
  @IsEmail()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: '_id' })
  @IsPhoneNumber('ZA')
  @IsNotEmpty()
  readonly contactNumber: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsUrl()
  readonly profileImageUrl: string;
}
