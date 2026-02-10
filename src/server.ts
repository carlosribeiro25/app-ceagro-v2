import { server } from "./app.js"

const PORT = process.env.PORT || 3000

server.listen({ port: Number(PORT), host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running in ${PORT}`)
})
