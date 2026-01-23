import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const  router: FastifyPluginAsyncZod = async (server) => {
    server.get('/', async (request,reply) => {
  return reply.status(200).send('Api its working!!')
})
}