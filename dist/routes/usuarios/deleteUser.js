import { db } from '../../db/cliente.js';
import { users } from '../../db/schema.js';
import { eq } from "drizzle-orm";
import z from "zod";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";
import { checkUseRole } from "../hooks/check_user_role.js";
export const deleteUsers = async (server) => {
    server.delete('/usuarios/:id', {
        preHandler: [
            checkRequestJWT,
            checkUseRole('Manager')
        ],
        schema: {
            tags: ['Usuários'],
            params: z.object({
                id: z.coerce.number()
            }),
            response: {
                200: z.object({ message: z.string() }).describe('Usuario Deletado com sucesso!'),
                404: z.object({ error: z.string() }).describe('Usuario não encontrado!')
            }
        }
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await db
            .delete(users)
            .where(eq(users.id, id))
            .returning();
        if (result.length > 0) {
            return reply.status(200).send({ message: `Usuario Deletado com sucesso` });
        }
        else {
            return reply.status(404).send({ error: `Usuário não encontrado` });
        }
    });
};
