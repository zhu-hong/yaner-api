const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router')

const app = new Koa()

app
  .use(bodyParser())
  .use(router.routes())
  .listen(8080)