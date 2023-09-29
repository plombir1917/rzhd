/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};
