import { PartialType } from '@nestjs/swagger';
import { CreateListingAgentDto } from './create-listing-agent.dto';

export class UpdateListingAgentDto extends PartialType(CreateListingAgentDto) {}
