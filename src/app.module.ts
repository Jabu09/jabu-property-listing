import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingModule } from './listing/listing.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Jabulani:YdAE0GsvovNjL62J@cluster0.bpyfdom.mongodb.net/?retryWrites=true&w=majority'), ListingModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
