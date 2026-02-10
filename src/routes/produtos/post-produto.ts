import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../../db/cliente.js';
import { produtos } from '../../db/schema.js'
import z from "zod";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";
import { checkUseRole } from "../hooks/check_user_role.js";

export const postProdutos: FastifyPluginAsyncZod = async (server) => {

  server.post('/produtos', {
     preHandler: [
          checkRequestJWT,
          checkUseRole('Manager'),
        ],
    schema: {
      tags: ['Produtos'],
      additionalProperties: true,
      body: z.object({
        name: z.string().min(4, ' Nome do produto deve ter no mínimo 4 caracteres!'),
        QNT: z.string(),
        D1: z.string(),
        D2: z.string(),
      }),
      response: {
        201: z.object({ produtoId: z.int()}).describe('Produto criado com sucesso!'),
        400: z.object({ error: z.string()}).describe('Erro ao cadastrar produto!')
      }
    }

  }, async (request, reply) => {


    const {name, QNT, D1, D2} = request.body

    try {
      const result = await db
        .insert(produtos)
        .values({ name, QNT, D1, D2 })
        .returning({ id: produtos.id })

      return reply.status(201).send({ produtoId: result[0].id })

    } catch (error) {
      console.error('Erro ao cadastrar produto:', error)
      return reply.status(400).send({ error: 'Erro ao cadastrar produto' })
    }
  })
}

