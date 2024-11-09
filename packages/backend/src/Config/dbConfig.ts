import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  host: process.env['DATABASE_HOST']!,
  port: parseInt(process.env['DATABASE_PORT']!, 10),
  username: process.env['DATABASE_USERNAME']!,
  password: process.env['DATABASE_PASSWORD']!,
  dbName: process.env['DATABASE_NAME']!,
};
