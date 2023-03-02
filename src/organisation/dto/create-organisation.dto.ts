import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, IsUrl } from 'class-validator';

export class CreateOrganisationDto {
  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '_id' })
  @IsUrl()
  logoUrl: string;

  @ApiProperty({ description: '_id' })
  @IsString()
  address: string;

  @ApiProperty({ description: '_id' })
  @IsString()
  description: string;
}
