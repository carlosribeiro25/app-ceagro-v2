import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastifyCors } from '@fastify/cors'
import { router, routerDefault } from './routes/routeDefault.js';
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
import { loginRoute } from './routes/login.js';

const server = fastify({logger: true }).withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, {
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
  ],

  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API de registro e recebimento de mercadorias',
      description: 'API de gerenciamento de Mercadorias',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'https://app-ceagro.fly.dev/',
        description: 'Produção'
      },
      {
        url: 'http://localhost:3000',
        description: 'Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true
  }, 
  staticCSP: true
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
server.register(loginRoute)
server.register(routerDefault)

export { server }