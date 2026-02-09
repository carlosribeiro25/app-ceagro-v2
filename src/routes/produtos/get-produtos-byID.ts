import { FastifyInstance } from "fastify"
import { db } from "../../db/cliente.js";
import { produtos } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import z from "zod";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";
import { autenticationUser } from "../utils/atentication-user.js";
import { checkUseRole } from "../hooks/check_user_role.js";

export async function getProdutosById(server: FastifyInstance) {
  server.get('/produtos/:id', {
     preHandler: [
            checkRequestJWT,
            checkUseRole('Manager')
          ],
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
            D1: z.string(),
            D2: z.string(),
          })
        }),
        404: z.object({ error: z.string()}).describe('Produto não encontrado!')
      }
    }
  }, async (request, reply) => {

    const user = autenticationUser(request)

    type Params = {
      id: Number
    }

    const params = request.params as Params
    const produtoId = Number(params.id)

    const produto = await db
      .select()
      .from(produtos)
      .where(eq(produtos.id, produtoId))
      
    if (!produto || produto.length === 0) {
      return reply.status(404).send({error: "Not Found"})
    }
    return reply.status(200).send({ produto: produto[0]})
  })
}
