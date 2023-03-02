import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListingAgentDto } from './dto/create-listing-agent.dto';
import { UpdateListingAgentDto } from './dto/update-listing-agent.dto';
import {
  ListingAgent,
  ListingAgentDocument,
} from './entities/listing-agent.schema';

@Injectable()
export class ListingAgentService {
  constructor(
    @InjectModel(ListingAgent.name)
    private listingAgentModel: Model<ListingAgentDocument>,
  ) {}

  create(createListingAgentDto: CreateListingAgentDto) {
    const createdListing = new this.listingAgentModel(createListingAgentDto);
    return createdListing.save();
  }

  findAll() {
    return this.listingAgentModel.find().exec();
  }

  findOne(id: string) {
    return this.listingAgentModel.findById(id).exec();
  }

  update(id: string, UpdateListingAgentDto: UpdateListingAgentDto) {
    return this.listingAgentModel
      .findByIdAndUpdate(id, UpdateListingAgentDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.listingAgentModel.findByIdAndDelete(id).exec();
  }
}
