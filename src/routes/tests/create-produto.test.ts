import { test, expect } from 'vitest';
import request from 'supertest'
import { server } from '../../app.js';

test('Produto criado com sucesso!', async () =>{
    await server.ready()

    const response = await request(server.server)
    .post('/produtos')
    .set('Content-Type', 'application/Json')
    .send({name: 'Limao ciciliano', QNT: 'jkenerkj', D1: 3, D2: 1})

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({
        produtoId: expect.any(Number),
    })
})

test('Bad Request', async () =>{
    await server.ready()

    const response = await request(server.server)
    .post('/produtos')
    .set('Content-Type', 'application/Json')
    .send({name: 'Batata inglesa', QNT: 5, D1: 3, D2: 1})

    expect(response.status).toEqual(400)
    expect(response.body).toEqual({
        error: 'Bad Request',
    })

})