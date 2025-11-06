import http from "node:http"
import { routes } from "./routes.js"
import { readReqBody } from "./middleware/read-req-body.js"

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await readReqBody(req, res)

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = url.match(route.path)

    req.groups = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res
    .writeHead(404)
    .end()
})

server.listen(3333)