// Prisma 7 reads the datasource URL from this file rather than from the schema.
import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // Runs the compiled seed: the generated client uses .js-style imports that
    // ts-node does not resolve, so the seed is built with the app first.
    seed: 'npm run prisma:seed',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
