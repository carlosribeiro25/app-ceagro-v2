import { fastify } from 'fastify';
import {serializerCompiler,validatorCompiler,jsonSchemaTransform, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { fastifySwagger} from '@fastify/swagger'
import {fastifySwaggerUi} from '@fastify/swagger-ui'
import {fastifyCors} from '@fastify/cors'
import { router } from './routes/routeDefault.js';
import { getProdutosById } from './routes/get-produtos-byID.js';
import { postProdutos } from './routes/post-produto.js';
import { patchProdutos } from './routes/patch-produtos.js';
import { putProdutos } from './routes/put-produtos.js';



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
server.register(getProdutosById)
server.register(postProdutos)
server.register(patchProdutos)
server.register(putProdutos)




server.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running http://localhost:3000/ 🔥')
})


