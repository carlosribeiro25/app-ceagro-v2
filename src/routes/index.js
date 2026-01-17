export default async function routes(app) {
  app.get('/', async () => {
    return { message: 'Api backend running!!' }
  })
}
