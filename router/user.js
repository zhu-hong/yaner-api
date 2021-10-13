const Router = require('koa-router')
const notion = require('../notion')
const Util = require('../util')
const Status = require('../status')
const Auth = require('../middleware')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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

router.get('/', Auth.useToken, async (ctx) => {
  const { uid } = jwt.verify(ctx.request.headers.authorization.replace('Bearer ', ''), process.env.TOKEN_SECRET_KEY)

  const { nikename, avatar } = await notion.getUserInfo(uid)

  ctx.body = {
    status: Status.SUCCESS,
    message: Status.getCodeMsg(Status.SUCCESS),
    data: {
      userInfo: {
        nikename,
        avatar,
      },
    },
  }
})

module.exports = router