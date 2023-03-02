import { Test, TestingModule } from '@nestjs/testing';
import { ListingAgentController } from './listing-agent.controller';
import { ListingAgentService } from './listing-agent.service';

describe('ListingAgentController', () => {
  let controller: ListingAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingAgentController],
      providers: [ListingAgentService],
    }).compile();

    controller = module.get<ListingAgentController>(ListingAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
