import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('listing')
@ApiTags('Listing')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingService.create(createListingDto);
  }

  @Get()
  findAll() {
    return this.listingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingService.update(id, updateListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingService.remove(id);
  }
}
