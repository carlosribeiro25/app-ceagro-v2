import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../../db/cliente.js';
import { users } from '../../db/schema.js'
import z from "zod";

export const createUser: FastifyPluginAsyncZod = async (server) => {

  server.post('/usuarios', {
    schema: {
      tags: ['Usuários'],
      additionalProperties: true,
      body: z.object({
        name: z.string(),
        telefone: z.string(),
        email: z.string(),
        password: z.string()
      }),
      response: {
        201: z.object({ userId: z.int()}).describe('Usuario criado com sucesso!'),
        400: z.object({ error: z.string()}).describe('Erro ao cadastrar usuario!')
      }
    }

  }, async (request, reply) => {
    const nameUser = request.body.name
    const emailUser = request.body.email
    const telefoneUser = request.body.telefone
    const passwordUser = request.body.password

    try {
      const result = await db
        .insert(users)
        .values({ name: nameUser, email: emailUser, telefone: telefoneUser, password: passwordUser })
        .returning({ id: users.id })

      return reply.status(201).send({ userId: result[0].id })

    } catch (error) {
      return reply.status(400).send({ error: 'Erro ao cadastrar usuario!' })
    }
  })
}

