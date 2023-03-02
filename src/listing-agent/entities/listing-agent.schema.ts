import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ListingAgentDocument = HydratedDocument<ListingAgent>;

@Schema()
export class ListingAgent {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  contactNumber: string;

  @Prop({ required: true })
  profileImageUrl: string;
}

export const ListingAgentSchema = SchemaFactory.createForClass(ListingAgent);
