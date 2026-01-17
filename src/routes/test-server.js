import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT }).then(() => {
      console.log('http server running!')
    })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()
