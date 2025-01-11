// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entitiy'; // Import the User entity
import { UserModule } from './user/user.module'; // Import UserModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin123',
      database: 'staffbase_db', // Ensure the correct DB is specified
      entities: [User], // Make sure User is included in the entities list
      synchronize: true, // Set to false in production to prevent schema changes
    }),
    UserModule, // Import the UserModule to ensure that the User entity is recognized
  ],
})
export class AppModule {}
