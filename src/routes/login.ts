import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from '../db/cliente.js';
import { users } from '../db/schema.js';
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'
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
      response: {
        200: z.object({ token: z.string()}),
        400: z.object({ error: z.string()})
      }
    }
  }, async (request, reply) => {

    const { email, password } = request.body

    console.log(' Email recebido:', email)

    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

        console.log(' Usuários encontrados:', result.length)
 

    if(result.length === 0){

          console.log(' Usuário não encontrado!')

        return reply.status(400).send({ error: 'Credenciais inválidas!' })
    }

    const user = result[0]

    console.log(' Usuário:', user.email)
    console.log(' Hash no banco:', user.password)

    const doesPasswordMatch = await verify(user.password, password)

    console.log(' Senha confere?', doesPasswordMatch)

    if(!doesPasswordMatch){
        return reply.status(400).send({ error: 'Credenciais inválidas!' })
    }

    if(!process.env.JWT_SECRET){
      throw new Error ('JWT_SECRET needs be set.')
    }

    const token = jwt.sign(
      {
      sub: String(user.id),
      role: user.role
      },
       process.env.JWT_SECRET)
       
    return reply.status(200).send({token})
     
  })
}