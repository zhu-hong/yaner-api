const Status = require('../status')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyAccount = (user, users) => {
  const muser = users.find(item => item.account === user.account)

  if (!muser) {
    return Status.ERROR_ACCOUNT_NOT_EXIST
  }

  if (user.password !== muser.password) {
    return Status.ERROR_PASSWORD_WRONG
  }

  return Status.SUCCESS
}

const generateToken = (uid, scope) => {
  return jwt.sign(
    {
      uid,
      scope,
    },
    secretKey = process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.TOKEN_EXPIRED_TIME,
    },
  )
}

module.exports = {
  verifyAccount,
  generateToken,
}