import { db } from '../../db/cliente.js';
import { users } from '../../db/schema.js';
import z from "zod";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";
import { checkUseRole } from "../hooks/check_user_role.js";
import { hash } from "argon2";
export const createUser = async (server) => {
    server.post('/usuarios', {
        preHandler: [
            checkRequestJWT,
            checkUseRole('Manager')
        ],
        schema: {
            tags: ['Usuários'],
            additionalProperties: true,
            body: z.object({
                name: z.string(),
                telefone: z.string(),
                email: z.string(),
                password: z.string(),
                role: z.enum(['Manager', 'Client']).optional().default('Client'),
            }),
            response: {
                201: z.object({ message: z.string(), userId: z.int() }).describe('Usuario criado com sucesso!'),
                400: z.object({ error: z.string() }).describe('Erro ao cadastrar usuario!')
            }
        }
    }, async (request, reply) => {
        const { name, email, telefone, password, role } = request.body;
        try {
            const hashedPassword = await hash(password);
            const result = await db
                .insert(users)
                .values({ name, email, telefone, password: hashedPassword, role })
                .returning({ id: users.id });
            return reply.status(201).send({ message: 'Usuario criado com sucesso!', userId: result[0].id });
        }
        catch (error) {
            return reply.status(400).send({ error: 'Erro ao cadastrar usuario!' });
        }
    });
};
