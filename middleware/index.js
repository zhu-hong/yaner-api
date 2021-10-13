const jwt = require('jsonwebtoken')
require('dotenv').config()
const Status = require('../status')

class Auth {
  static async useToken(ctx, next) {
    try {
      const token = ctx.request.headers.authorization.replace('Bearer ', '')
      jwt.verify(token, process.env.TOKEN_SECRET_KEY)
      await next()
      return
    } catch (err) {
      if (err.name !== 'TokenExpiredError') {
        ctx.body = {
          status: Status.ERROR_TOKEN_WORNG,
          message: Status.getCodeMsg(Status.ERROR_TOKEN_WORNG),
          error: err.name,
        }
        return
      }

      ctx.body = {
        status: Status.ERROR_TOKEN_TIMEOUT,
        message: Status.getCodeMsg(Status.ERROR_TOKEN_TIMEOUT)
      }
      return
    }
  }

  static async useScope(ctx, next) {
    const { scope } = jwt.verify(ctx.request.headers.authorization.replace('Bearer ', ''), process.env.TOKEN_SECRET_KEY)
    if (!scope >= process.env.ADMIN_SCOPE) {
      ctx.body = {
        status: Status.ERROR_ACCOUNT_SCOPELESS,
        message: Status.getCodeMsg(Status.ERROR_ACCOUNT_SCOPELESS),
      }
      return
    }

    await next()
  }
}

module.exports = Auth