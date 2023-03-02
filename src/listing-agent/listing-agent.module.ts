import { Module } from '@nestjs/common';
import { ListingAgentService } from './listing-agent.service';
import { ListingAgentController } from './listing-agent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ListingAgent,
  ListingAgentSchema,
} from './entities/listing-agent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ListingAgent.name, schema: ListingAgentSchema },
    ]),
  ],
  controllers: [ListingAgentController],
  providers: [ListingAgentService],
})
export class ListingAgentModule {}
