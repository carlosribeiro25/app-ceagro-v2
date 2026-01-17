import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.DATABASE_URL;

if(!databaseUrl){
    throw new Error('DATABASE_URL env is required')
}

export const db = drizzle(databaseUrl);
