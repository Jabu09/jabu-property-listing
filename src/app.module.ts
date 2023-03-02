import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingModule } from './listing/listing.module';
import { ListingAgentModule } from './listing-agent/listing-agent.module';
import { OrganisationModule } from './organisation/organisation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [],
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.CONNECTION_STRING}`),
    ListingModule,
    ListingAgentModule,
    OrganisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
