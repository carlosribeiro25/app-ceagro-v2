import type { FastifyRequest, FastifyReply } from "fastify";
import { autenticationUser } from "../utils/atentication-user.js";

export function checkUseRole(role: string) {
    return async function (request: FastifyRequest, reply: FastifyReply)  {
      const user = autenticationUser(request)

      if(user.role !== role) {
        return reply.status(401).send()
      }
    }
}