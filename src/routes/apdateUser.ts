import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../db/cliente.js';
import {  users } from '../db/schema.js'
import { eq } from "drizzle-orm";
import z from "zod";

export const updateUser: FastifyPluginAsyncZod = async (server) => {

    server.patch('/user/:id', {
        schema: {
            tags: ['Usuário'],
            params: z.object({
                id: z.coerce.number().int()
            }),
            additionalProperties: true,
            body: z.object({
                name: z.string(),
                email: z.string(),
                telefone: z.string(),
                password: z.string(),
            }),
            response: {
               200: z.object({message: z.string(),
                users: z.any()
               }).describe('Usuario atualizado com sucesso!'),
               404: z.object({error: z.string()}).describe('Usuário não encontrado!')
            }            
        }

    }, async (request, reply) => {

        const { id } = request.params
        const body = request.body

        const updated = await db
            .update(users)
            .set(body)
            .where(eq(users.id, id))
            .returning();

        if (!updated.length) {
            return reply.status(404).send({ error: `Usuario não encontrado` })
        }
        return reply.status(200).send({ message: "Usuario atualizado com sucesso", users: updated[0] })
    })
}

