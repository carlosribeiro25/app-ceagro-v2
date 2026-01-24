import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {db} from '../db/cliente.js';
import {produtos} from '../db/schema.js'

export const listarProdutos:FastifyPluginAsyncZod  = async (server) => {

server.get('/produtos',{
    schema: {
        tags: ['Produtos'],
        summary: 'Essa rota lista todos os Produtos.',
    }
}, async (request, reply) =>{
try{
    const allProdutos = await db
    .select()
    .from(produtos)

     return reply.status(200).send({produtos: allProdutos})
} catch(error){
     console.log(error)
        return reply.status(404).send({error: `Produtos não encontrados`, 
            details: error instanceof Error ? error.message : String(error)})
}
} 
)} 

