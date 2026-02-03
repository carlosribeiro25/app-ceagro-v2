import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import { router } from './routes/routeDefault.js';
import { getProdutosById } from './routes/produtos/get-produtos-byID.js';
import { postProdutos } from './routes/produtos/post-produto.js';
import { patchProdutos } from './routes/produtos/patch-produtos.js';
import { putProdutos } from './routes/produtos/put-produtos.js';
import { deleteProdutos } from './routes/produtos/delete-produtos.js';
import { listarProdutos } from './routes/produtos/get-produtos.js'
import { createUser } from './routes/usuarios/createUser.js';
import { deleteUsers } from './routes/usuarios/deleteUser.js';
import { updateUser } from './routes/usuarios/apdateUser.js';
import { listarUsers } from './routes/usuarios/getUsers.js';
import { getUsuariosById } from './routes/usuarios/getUsersById.js';
import { putUsers } from './routes/usuarios/put-users.js';

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
server.register(putUsers)


export { server }