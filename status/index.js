const [SUCCESS, ERROR] = [200, 500]

// 账号错误
const [
  ERROR_ACCOUNT_NOT_EXIST,
  ERROR_PASSWORD_WRONG,
] = [
    30001,
    30002,
]

const codemsg = new Map()

codemsg.set(200, 'OK')
codemsg.set(500, 'FAIL')
codemsg.set(30001, '账号不存在')
codemsg.set(30002, '账号或密码错误')

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
}