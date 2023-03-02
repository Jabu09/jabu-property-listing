import { Test, TestingModule } from '@nestjs/testing';
import { ListingAgentService } from './listing-agent.service';

describe('ListingAgentService', () => {
  let service: ListingAgentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListingAgentService],
    }).compile();

    service = module.get<ListingAgentService>(ListingAgentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
