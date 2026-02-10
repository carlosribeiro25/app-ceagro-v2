import { server } from "./app.js"

const port = process.env.PORT || 3000

server.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running in ${port}`)
})
