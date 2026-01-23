import { FastifyInstance } from "fastify"
import { db } from "../db/cliente.js";
import { produtos } from "../db/schema.js";
import { eq } from "drizzle-orm";


export async function getProdutosById(server:FastifyInstance) {
    server.get('/produtos/:id', async (request, reply) => {
  type Params = {
    id: Number
  }

  const params = request.params as Params
  const produtoId = Number(params.id)

  const produto = await db
    .select()
    .from(produtos)
    .where(eq(produtos.id, produtoId))

  if(produto.length > 0) {
    return { produto: produto[0] }
  }

  return reply.status(404).send( { error: "Produto não encontrado"})
})
}

