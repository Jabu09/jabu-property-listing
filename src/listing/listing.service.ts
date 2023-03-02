import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing, ListingDocument } from './entities/listing.schema';

@Injectable()
export class ListingService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
  ) {}

  create(createListingDto: CreateListingDto) {
    const createdListing = new this.listingModel(createListingDto);
    return createdListing.save();
  }

  findAll() {
    return this.listingModel.find().exec();
  }

  findOne(id: string) {
    return this.listingModel.findById(id).exec();
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    return this.listingModel
      .findByIdAndUpdate(id, updateListingDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.listingModel.findByIdAndDelete(id).exec();
  }
}
