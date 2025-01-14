import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entitiy';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/employee.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin123',
      database: 'staffbase_db',
      schema: 'staffbase',
      entities: [User, Employee],
      synchronize: true,
    }),
    UserModule,
    EmployeeModule,
    AuthModule
  ],
})
export class AppModule {}
