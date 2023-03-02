import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import {
  Organisation,
  OrganisationDocument,
} from './entities/organisation.schema';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel(Organisation.name)
    private organisationModel: Model<OrganisationDocument>,
  ) {}

  create(createOrganisationDto: CreateOrganisationDto) {
    const createdListing = new this.organisationModel(createOrganisationDto);
    return createdListing.save();
  }

  findAll() {
    return this.organisationModel.find().exec();
  }

  findOne(id: string) {
    return this.organisationModel.findById(id).exec();
  }

  update(id: string, updateOrganisationDto: UpdateOrganisationDto) {
    return this.organisationModel
      .findByIdAndUpdate(id, updateOrganisationDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.organisationModel.findByIdAndDelete(id).exec();
  }
}
