import { autenticationUser } from "../utils/atentication-user.js";
export function checkUseRole(role) {
    return async function (request, reply) {
        const user = autenticationUser(request);
        if (user.role !== role) {
            return reply.status(401).send();
        }
    };
}
