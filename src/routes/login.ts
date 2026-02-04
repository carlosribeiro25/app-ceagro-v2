import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../db/cliente.js';
import { users } from '../db/schema.js';
import { eq } from "drizzle-orm";
import z from "zod";
import { verify } from "argon2";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {

  server.post('/login', {
    schema: {
      tags: ['Auth'],
      additionalProperties: true,
      body: z.object({
        email: z.string().email(),
        password: z.string()
      }),
    }
  }, async (request, reply) => {

    const { email, password } = request.body

    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

    if(result.length === 0){
        return reply.status(400).send({ error: 'Credenciais inválidas!' })
    }

    const user = result[0]

    const doesPasswordMatch = await verify(user.password, password)

    if(!doesPasswordMatch){
        return reply.status(400).send({ error: 'Credenciais inválidas!' })
    }

    return reply.status(200).send({ message: 'OK' })
     
  })
}