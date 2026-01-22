// import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

// import fastify from "fastify"

// const server = fastify()

// export const routeDefault: FastifyPluginAsyncZod = async(server) => {
//     server.get('/', (request, reply) => {
//     return reply.status(200).send('Api its working!!')
// })
// }


import type { FastifyInstance } from "fastify";

export async function router(server: FastifyInstance) {
    server.get('/', (request,reply) => {
  return reply.status(200).send('Api its working!!')
})
}