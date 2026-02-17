import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entitiy';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret: process.env.JWT_SECRET || 'defaultSecretKey' })],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}