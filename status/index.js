const codemsg = new Map()

const getCodeMsg = (code) => {
  const message = codemsg.get(code)
  return message
}

// 不导致账号退出
const [
  SUCCESS,
  ERROR_ACCOUNT_SCOPELESS,
] = [
  200,
  301,
]
codemsg.set(200, 'OK')
codemsg.set(301, '权限不足')

// 账号错误
const [
  ERROR_ACCOUNT_NOT_EXIST,
  ERROR_PASSWORD_WRONG,
] = [
    400,
    401,
]
codemsg.set(400, '账号不存在')
codemsg.set(401, '账号或密码错误')

// Token错误
const [
  ERROR_TOKEN_TIMEOUT,
  ERROR_TOKEN_WORNG,
] = [
    500,
    501,
]
codemsg.set(500, 'TOKEN TIMEOUT')
codemsg.set(501, 'TOKEN WORNG')

module.exports = {
  getCodeMsg,
  SUCCESS,
  ERROR_ACCOUNT_SCOPELESS,
  ERROR_ACCOUNT_NOT_EXIST,
  ERROR_PASSWORD_WRONG,
  ERROR_TOKEN_TIMEOUT,
  ERROR_TOKEN_WORNG,
}