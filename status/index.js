const [SUCCESS, ERROR] = [200, 500]

// 账号错误
const [
  ERROR_ACCOUNT_NOT_EXIST,
  ERROR_PASSWORD_WRONG,
] = [
    30001,
    30002,
]

// Token错误
const [
  ERROR_TOKEN_TIMEOUT,
  ERROR_TOKEN_WORNG,
] = [
    40001,
    40002
]

const codemsg = new Map()

codemsg.set(200, 'OK')
codemsg.set(500, 'FAIL')
codemsg.set(30001, '账号不存在')
codemsg.set(30002, '账号或密码错误')
codemsg.set(40001, 'TOKEN TIMEOUT')
codemsg.set(40002, 'TOKEN WORNG')

const getCodeMsg = (code) => {
  const message = codemsg.get(code)
  return message
}

module.exports = {
  SUCCESS,
  ERROR,
  ERROR_ACCOUNT_NOT_EXIST,
  ERROR_PASSWORD_WRONG,
  getCodeMsg,
  ERROR_TOKEN_TIMEOUT,
  ERROR_TOKEN_WORNG,
}