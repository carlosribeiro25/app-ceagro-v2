import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {db} from '../db/cliente.js';
import {produtos} from '../db/schema.js'

export const postProdutos:FastifyPluginAsyncZod  = async (server) => {
server.post('/produtos', async (request, reply) =>{
  type Body = {
    name: string 
    qnt: string
    D1: string
    D2: string
  }

//   const produtoId = randomUUID()
  const body = request.body as  Body

  const produtoName = body.name
  const produtoQnt = body.qnt
  const produtoD1 = body.D1
  const produtoD2 = body.D2

  try{
      const result = await db
  .insert(produtos)
  .values({name: produtoName, qnt: produtoQnt, D1: produtoD1, D2: produtoD2})
  .returning()

    return reply.status(201).send({produtoId: result[0].id})

  } catch(error) {
    console.error('Erro ao cadastrar produto:', error)
    return reply.status(500).send({error: 'Erro ao cadastrar produto', details: error instanceof Error ? error.message : String(error)})
  }
})
}

