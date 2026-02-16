import { db } from '../../db/cliente.js';
import { produtos } from '../../db/schema.js';
import { eq } from "drizzle-orm";
import z from "zod";
import { error } from "console";
import { checkUseRole } from "../hooks/check_user_role.js";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";
export const putProdutos = async (server) => {
    server.put('/produtos/:id', {
        preHandler: [
            checkRequestJWT,
            checkUseRole('Manager'),
        ],
        schema: {
            tags: ['Produtos'],
            params: z.object({
                id: z.coerce.number()
            }),
            additionalProperties: true,
            body: z.object({
                name: z.string().min(4, 'nome do produto deve ter no mínimo 4 caracteres!'),
                QNT: z.string(),
                D1: z.string(),
                D2: z.string(),
            }),
            response: {
                200: z.object({ message: z.string(), produtos: z.any() }).describe("Produto atualizado com sucesso!"),
                404: z.object({ error: z.string() }).describe("Produto não encontrado!"),
            }
        }
    }, async (request, reply) => {
        const { id } = request.params;
        const body = request.body;
        const updated = await db
            .update(produtos)
            .set(body)
            .where(eq(produtos.id, id))
            .returning({ id: produtos.id, name: produtos.name, QNT: produtos.QNT, D1: produtos.D1, D2: produtos.D2 });
        if (!updated.length) {
            console.log(error);
            return reply.status(404).send({
                error: `Produto não encontrado`,
            });
        }
        return reply.status(200).send({ message: "Produto atualizado com sucesso", produtos: updated[0] });
    });
};
