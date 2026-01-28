import { FastifyInstance } from "fastify"
import { db } from "../db/cliente.js";
import { produtos } from "../db/schema.js";
import { eq } from "drizzle-orm";
import z from "zod";

export async function getProdutosById(server: FastifyInstance) {
  server.get('/produtos/:id', {
    schema: {
      tags: ['Produtos'],
      params: z.object({
        id: z.coerce.number().int()
      }),
      response: {
        200: z.object({
          produto: z.object({
            id: z.coerce.number(),
            name: z.string(),
            QNT: z.string(),
            D1: z.coerce.number(),
            D2: z.coerce.number(),
          })
        }),
        404: z.object({ error: z.string()}).describe('Produto não encontrado!')
      }
    }
  }, async (request, reply) => {

    type Params = {
      id: Number
    }

    const params = request.params as Params
    const produtoId = Number(params.id)
    
    const produto = await db
      .select()
      .from(produtos)
      .where(eq(produtos.id, produtoId))
      
    if (produto.length > 0) {
      return { produto: produto[0] }
    }
    return reply.status(404).send({ error: "Produto não encontrado!" })
  })
}
