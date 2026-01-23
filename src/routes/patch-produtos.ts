import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {db} from '../db/cliente.js';
import {produtos} from '../db/schema.js'
import { eq } from "drizzle-orm";
import z from "zod";
import { error } from "console";

export const patchProdutos:FastifyPluginAsyncZod  = async (server) => {

server.patch('/produtos/:id',{
    schema: {
        tags: ['Produtos'],
        params: z.object({
            id: z.coerce.number().int()
        }),
        additionalProperties: true,
        body: z.object({
            name: z.string().min(4, 'O nome do produto deve ter no mínimo 4 caracteres!'),
            QNT: z.string(),
            D1: z.coerce.number(),
            D2: z.coerce.number(),    
        })
    }

}, async (request, reply) =>{

  const {id} = request.params 
  const body = request.body   

    const updated = await db
  .update(produtos)
  .set(body)
  .where(eq(produtos.id, id))
  .returning();

  if(!updated.length){
    console.log(error)
        return reply.status(404).send({error: `Curso não encontrado`, 
            details: error instanceof Error ? error.message : String(error)})
  }
       return reply.status(200).send({ message: "Curso atualizado com sucesso", produtos: updated[0]})

})
}

