import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../../db/cliente.js';
import { users } from '../../db/schema.js'
import { checkUseRole } from "../hooks/check_user_role.js";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";

export const listarUsers: FastifyPluginAsyncZod = async (server) => {

    server.get('/usuarios', {
        preHandler: [
            checkRequestJWT,
            checkUseRole('Manager')
        ],
        schema: {
            tags: ['Usuarios'],
            summary: 'Essa rota lista todos os Usuarios.',
        }
    }, async (request, reply) => {

        const result = await db
            .select()
            .from(users)

        if (!result || result.length === 0) {
            return reply.status(404).send({ error: `Usuarios não encontrados` })
        }
        return reply.status(200).send({ users: result }

        )
    }
    )
}

