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
import { ListingAgentService } from './listing-agent.service';
import { CreateListingAgentDto } from './dto/create-listing-agent.dto';
import { UpdateListingAgentDto } from './dto/update-listing-agent.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('agent')
@ApiTags('agent')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class ListingAgentController {
  constructor(private readonly listingAgentService: ListingAgentService) {}

  @Post()
  create(@Body() createListingAgentDto: CreateListingAgentDto) {
    return this.listingAgentService.create(createListingAgentDto);
  }

  @Get()
  findAll() {
    return this.listingAgentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingAgentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListingAgentDto: UpdateListingAgentDto,
  ) {
    return this.listingAgentService.update(id, updateListingAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingAgentService.remove(id);
  }
}
