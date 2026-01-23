import { fastify } from 'fastify';
import {serializerCompiler,validatorCompiler,jsonSchemaTransform, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { fastifySwagger} from '@fastify/swagger'
import {fastifySwaggerUi} from '@fastify/swagger-ui'
import {fastifyCors} from '@fastify/cors'
import { randomUUID } from 'node:crypto';
import { router } from './routes/routeDefault.js';
import { getProdutos } from './routes/get-produtos.js';
import { postProdutos } from './routes/post-produto.js';


const produtos = [
{ id: '1', name: 'Banana',qnt: 202 },
{ id: '2',name: 'Abacaxi', qnt: 22 },
{ id: '3',name: 'Acerola', qnt: 20},
]

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, {
  origin: '*'
  // methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  // credentials: true,
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Controle de compras',
      description: 'Api de recebimento de mercadorias',
      version: '1.0.0'
    },
  },

  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

server.register(router)
server.register(getProdutos)
server.register(postProdutos)


server.get('/produtos', (request, reply) => {
  return {produtos, page: 1}
})


server.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running http://localhost:3000/ 🔥')
})


