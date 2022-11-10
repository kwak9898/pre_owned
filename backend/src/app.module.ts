import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersController } from './domains/members/members.controller';
import { MembersService } from './domains/members/members.service';
import { MembersModule } from './domains/members/members.module';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    MembersModule,
  ],
  controllers: [AppController, MembersController],
  providers: [AppService, MembersService],
})
export class AppModule {}
