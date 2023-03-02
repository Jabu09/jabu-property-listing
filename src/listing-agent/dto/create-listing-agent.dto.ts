import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly contactNumber: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly profileImageUrl: string;
}
