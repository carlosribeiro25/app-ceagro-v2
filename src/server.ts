import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider
} from 'fastify-type-provider-zod';
import { fastifySwagger} from '@fastify/swagger'
import {fastifyCors} from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'


const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  // credentials: true,
})


server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Controle de compras',
      description: 'Api de controle de compras de mercadorias',
      version: '1.0.0'
    },
  },

  transform: jsonSchemaTransform,
})

server.register(ScalarApiReference, {
  routePrefix: '/docs'
})

server.get('/', () => {
  return 'Api its working!!'
})



server.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running http://localhost:3000/ 🔥')
})


