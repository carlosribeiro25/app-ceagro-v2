import { db } from '../../db/cliente.js';
import { produtos } from '../../db/schema.js';
import { checkUseRole } from "../hooks/check_user_role.js";
import { checkRequestJWT } from "../hooks/check_request_jwt.js";
export const listarProdutos = async (server) => {
    server.get('/produtos', {
        preHandler: [
            checkRequestJWT,
            checkUseRole('Manager')
        ],
        schema: {
            tags: ['Produtos'],
            summary: 'Essa rota lista todos os Produtos.',
        }
    }, async (request, reply) => {
        const allProdutos = await db
            .select()
            .from(produtos);
        if (!allProdutos || allProdutos.length === 0) {
            return reply.status(404).send({ error: `Produtos não encontrados` });
        }
        return reply.status(200).send({ produtos: allProdutos });
    });
};
