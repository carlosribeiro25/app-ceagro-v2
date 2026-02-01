import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../db/cliente.js';
import { produtos } from '../db/schema.js'
import { eq } from "drizzle-orm";
import z from "zod";

export const deleteProdutos: FastifyPluginAsyncZod = async (server) => {

  server.delete('/produtos/:id', {
    schema: {
      tags: ['Produtos'],
      params: z.object({
        id: z.coerce.number()
      }),
      response: {
        200: z.object({ message: z.string()}).describe('Produto Deletado com sucesso!'),
        404:z.object({ error: z.string()}).describe('Produto não encontrado!')
      }
    }

  }, async (request, reply) => {

    const { id } = request.params

    const result = await db
      .delete(produtos)
      .where(eq(produtos.id, id))
      .returning();

    if (result.length > 0) {
      return reply.status(200).send({message:  `Produto Deletado com sucesso.` })
    } else {
      return reply.status(404).send({ error: `Produto não encontrado.` })
    }

  })
}