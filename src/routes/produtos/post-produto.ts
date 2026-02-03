import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../../db/cliente.js';
import { produtos } from '../../db/schema.js'
import z from "zod";

export const postProdutos: FastifyPluginAsyncZod = async (server) => {

  server.post('/produtos', {
    schema: {
      tags: ['Produtos'],
      additionalProperties: true,
      body: z.object({
        name: z.string().min(4, ' Nome do produto deve ter no mínimo 4 caracteres!'),
        QNT: z.string(),
        D1: z.coerce.number(),
        D2: z.coerce.number(),
      }),
      response: {
        201: z.object({ produtoId: z.int()}).describe('Produto criado com sucesso!'),
        400: z.object({ error: z.string()}).describe('Erro ao cadastrar produto!')
      }
    }

  }, async (request, reply) => {

    const produtoName = request.body.name
    const produtoQnt = request.body.QNT
    const produtoD1 = request.body.D1
    const produtoD2 = request.body.D2

    try {
      const result = await db
        .insert(produtos)
        .values({ name: produtoName, QNT: produtoQnt, D1: produtoD1, D2: produtoD2 })
        .returning()

      return reply.status(201).send({ produtoId: result[0].id })

    } catch (error) {
      console.error('Erro ao cadastrar produto:', error)
      return reply.status(400).send({ error: 'Erro ao cadastrar produto' })
    }
  })
}

