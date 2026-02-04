import { test, expect } from 'vitest';
import request from 'supertest'
import { server } from '../app.js';
import { makeUser } from '../factory/makeUser.js';

test('login', async () =>{
    await server.ready()

    const { user, passwordBeforeHash} = await makeUser()

    const response = await request(server.server)
    .post('/login')
    .set('Content-Type', 'application/Json')
    .send({
        email: user.email,
        password: passwordBeforeHash,
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        message: 'OK',
    })
})

test('Credenciais inválidas!', async () =>{
    await server.ready()

    const { user } = await makeUser()  // Removido passwordBeforeHash pois não vamos usar

    const response = await request(server.server)
    .post('/login')
    .set('Content-Type', 'application/Json')
    .send({
        email: user.email,
        password: 'senhaErrada123',  // ✅ Senha incorreta
    })

    expect(response.status).toEqual(400)
    expect(response.body).toEqual({
        error: 'Credenciais inválidas!',
    })
})