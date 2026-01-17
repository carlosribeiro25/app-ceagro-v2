import fastify from 'fastify'
import routes from './routes/index.js'

const app = fastify({
  logger: true,
})

await app.register(routes)

export default app
