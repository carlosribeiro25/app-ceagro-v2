// routes/health.ts
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../db/cliente.js'; 
import { sql } from 'drizzle-orm';

export const router: FastifyPluginAsyncZod = async (server) => {
  server.get('/health', {
    schema: {
      tags: ['Health'],
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    return reply.status(200).send({
      status: 'Nossa Api esta em Produção!',
      timestamp: new Date().toISOString()
    });
  });

  
  server.get('/health/full', {
    schema: {
      tags: ['Health'],
    }
  }, async (request, reply) => {
    try {
      await db.execute(sql`SELECT 1`);
      
      return reply.status(200).send({
        status: 'Nossa Api esta em Produção!',
        database: 'connected',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      return reply.status(503).send({
        status: 'error',
        database: 'disconnected',
        timestamp: new Date().toISOString()
      });
    }
  });
};

export const routerDefault: FastifyPluginAsyncZod = async (server) => {
  server.get('/', async (request, reply) => {
    return reply.status(200).send({ message: 'Seja bem-vindo!' });
  });
};