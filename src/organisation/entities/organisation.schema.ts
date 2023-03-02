import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganisationDocument = HydratedDocument<Organisation>;

@Schema()
export class Organisation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logoUrl: string;

  @Prop()
  address: string;

  @Prop()
  description: string;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
