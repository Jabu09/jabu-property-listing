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
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.bpyfdom.mongodb.net/?retryWrites=true&w=majority`,
    ),
    ListingModule,
    ListingAgentModule,
    OrganisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
