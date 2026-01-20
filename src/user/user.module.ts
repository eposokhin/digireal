import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './database/models/user.model';
import { TransactionModel } from './database/models/transaction.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TransactionModel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
