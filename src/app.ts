import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import { router } from './routes/routeDefault.js';
import { getProdutosById } from './routes/get-produtos-byID.js';
import { postProdutos } from './routes/post-produto.js';
import { patchProdutos } from './routes/patch-produtos.js';
import { putProdutos } from './routes/put-produtos.js';
import { deleteProdutos } from './routes/delete-produtos.js';
import { listarProdutos } from './routes/get-produtos.js'
import { createUser } from './routes/createUser.js';
import { deleteUsers } from './routes/deleteUser.js';
import { updateUser } from './routes/apdateUser.js';
import { listarUsers } from './routes/getUsers.js';
import { getUsuariosById } from './routes/getUsersById.js';

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, {
  origin: '*'

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
server.register(getProdutosById)
server.register(postProdutos)
server.register(patchProdutos)
server.register(putProdutos)
server.register(deleteProdutos)
server.register(listarProdutos)
server.register(createUser)
server.register(deleteUsers)
server.register(updateUser)
server.register(listarUsers)
server.register(getUsuariosById)

export { server }