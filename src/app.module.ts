import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresDataSource } from './config/postgres.config';
import { HealthModule } from './features/health/health.module';
import { ProfessionalModule } from './features/professional/professional.module';
import { Professional } from './models/professional.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot(PostgresDataSource.options),
    TypeOrmModule.forFeature([Professional]),
    HealthModule,
    ProfessionalModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
