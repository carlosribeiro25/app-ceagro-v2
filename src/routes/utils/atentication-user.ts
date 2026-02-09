import type { FastifyRequest } from "fastify";

export function autenticationUser(request: FastifyRequest) {
    const user = request.user

    if(!user) {
        throw new Error('Invalid autentication')
    }

    return user
}