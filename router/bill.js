const Router = require('koa-router')
const Auth = require('../middleware')
const notion = require('../notion')
const Status = require('../status')

const router = new Router({
  prefix: '/bill'
})

router.get('/', Auth.useToken, async (ctx) => {
  const bills = await notion.getBills()

  ctx.body = {
    status: Status.SUCCESS,
    message: Status.getCodeMsg(Status.SUCCESS),
    data: bills,
  }
})

module.exports = router
