import jwt from 'jsonwebtoken';
export async function checkRequestJWT(request, reply) {
    const authHeader = request.headers.authorization;
    console.log('Header Authorization', authHeader);
    if (!authHeader) {
        return reply.status(401).send({ error: 'Token não enviado' });
    }
    const token = authHeader.replace('Bearer ', '');
    console.log('Token extraido', token);
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET needs be set.');
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        request.user = payload;
        console.log('Usuário autenticado:', payload);
    }
    catch (error) {
        console.log(' Erro ao verificar token: ', error);
        return reply.status(401).send();
    }
}
