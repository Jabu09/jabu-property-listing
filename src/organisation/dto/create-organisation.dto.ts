import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganisationDto {
  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  logoUrl: string;

  @ApiProperty({ description: '_id' })
  @IsString()
  address: string;

  @ApiProperty({ description: '_id' })
  @IsString()
  description: string;
}
