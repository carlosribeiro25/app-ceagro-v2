import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const router: FastifyPluginAsyncZod = async (server) => {
  server.get('/health',{
    schema: {
      tags: ['Produtos'],
    }
  }, async (request, reply) => {
    return reply.status(200).send('Api its working!!')
  })
}

