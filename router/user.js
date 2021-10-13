const Router = require('koa-router')
const notion = require('../notion')
const Util = require('../util')
const Status = require('../status')

const router = new Router({
  prefix: '/user'
})

router.post('/', async (ctx) => {
  const user = ctx.request.body
  const users = await notion.getUsers()

  const status = Util.verifyAccount(user, users)
  const message = Status.getCodeMsg(status)

  if (status !== Status.SUCCESS) {
    ctx.body = {
      status,
      message,
    }
    return
  }

  const cuser = users.find(item => item.account === user.account)
  const token = Util.generateToken(cuser.id, cuser.scope)
  ctx.body = {
    status,
    message,
    token,
  }
})

module.exports = router