import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookModule } from "./book/book.module";

config();
@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gntz4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
