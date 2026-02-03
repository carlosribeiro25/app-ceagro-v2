import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../../db/cliente.js';
import { users } from '../../db/schema.js'

export const listarUsers: FastifyPluginAsyncZod = async (server) => {

    server.get('/usuarios', {
        schema: {
            tags: ['Usuarios'],
            summary: 'Essa rota lista todos os Usuários.',
        }
    }, async (request, reply) => {
        try {
            const allUsers = await db
                .select()
                .from(users)

            return reply.status(200).send({ Usuarios: allUsers })
        } catch (error) {
            console.log(error)
            return reply.status(404).send({
                error: `Usuários não encontrado`,
                details: error instanceof Error ? error.message : String(error)
            })
        }
    }
    )
}

