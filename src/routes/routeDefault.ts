import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../db/cliente.js';
import { produtos } from '../db/schema.js'
import z from "zod";

export const router: FastifyPluginAsyncZod = async (server) => {
  server.get('/', async (request, reply) => {
    return reply.status(200).send('Api its working!!')
  })
}

export const readProdutos: FastifyPluginAsyncZod = async (server) => {
  server.get('/produtos', {
    schema: {
      tags: ['Produtos'],
      params: z.object({
        id: z.coerce.number().int()
      }),
      additionalProperties: true,
      body: z.object({
        name: z.string(),
        QNT: z.string(),
        D1: z.coerce.number(),
        D2: z.coerce.number(),
      })
    }
  }, async (request, reply) => {

  const {id} = request.params 
  const  body = request.body 

  const produtos = await db.query.produtos.findMany()
    return reply.status(200).send('Api its working!!')
  })
}