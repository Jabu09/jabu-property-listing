import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PropertyUnit } from './propertyUnit.schema';

export type ListingDocument = HydratedDocument<Listing>;

@Schema()
export class Listing {
  @Prop({ required: true })
  agent: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  organisation: string;

  @Prop({ required: true })
  listingType: string;

  @Prop({ required: true })
  listingSector: string;

  @Prop()
  unit: PropertyUnit;

  @Prop()
  images: string[];
}

export const ListingSchema = SchemaFactory.createForClass(Listing);
