import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const router: FastifyPluginAsyncZod = async (server) => {
  server.get('/',{
    schema: {
      tags: ['Produtos'],
    }
  }, async (request, reply) => {
    return reply.status(200).send(`<h1> Seja bem-vindo </h1>`)
  })
}


