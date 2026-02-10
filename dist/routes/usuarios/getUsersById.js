import { db } from '../../db/cliente.js';
import { users } from '../../db/schema.js';
import { eq } from "drizzle-orm";
import z from "zod";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";
import { checkUseRole } from "../hooks/check_user_role.js";
export async function getUsuariosById(server) {
    server.get('/usuarios/:id', {
        preHandler: [
            checkRequestJWT,
            checkUseRole('Manager')
        ],
        schema: {
            tags: ['Usuarios'],
            params: z.object({
                id: z.coerce.number().int()
            }),
            response: {
                200: z.object({
                    users: z.object({
                        id: z.coerce.number(),
                        name: z.string(),
                        email: z.string(),
                        telefone: z.string(),
                        password: z.string(),
                        role: z.enum(['Manager', 'Client']).optional()
                    })
                }),
                404: z.object({ error: z.string() }).describe('Usuário não encontrado!')
            }
        }
    }, async (request, reply) => {
        const params = request.params;
        const userId = Number(params.id);
        const result = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));
        if (result.length > 0) {
            return { users: result[0] };
        }
        return reply.status(404).send({ error: "Usuario não encontrado!" });
    });
}
