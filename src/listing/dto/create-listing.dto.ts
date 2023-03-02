import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateListingDto {
  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly agent: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly organisation: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly listingType: string;

  @ApiProperty({ description: '_id' })
  @IsNotEmpty()
  @IsString()
  readonly listingSector: string;

  @ApiProperty({ description: '_id' })
  unit: {
    bedrooms: number;
    bathrooms: number;
    parking: number;
    price: number;
  };

  @ApiProperty({ description: '_id' })
  @IsArray()
  images: string[];
}

