import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovementsController } from '../users/controller/movements.controller';
import { UsersController } from './controller/users.controller';
import { MovementsService } from '../users/service/movements.service';
import { UsersService } from './service/users.service';
import { Users, UsersShema } from './entities/users.entity';
import { Movements, MovementsShema } from '../users/entities/movements.entity';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Users.name,
      schema: UsersShema,
    },
    {
      name: Movements.name,
      schema: MovementsShema,
    }
  ])],
  controllers: [
    UsersController,
    MovementsController,
  ],
  providers: [
    UsersService, 
    MovementsService,
  ]
})
export class UsersModule { }
