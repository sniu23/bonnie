
export const loginRule = {
  no: { type: 'string', message: '帐号不能为空！', required: true },
  password: { type: 'string', message: '密码不能为空！', required: true }
}

export function confirmPwd(rule, value, callback, source, options) {
  var errors = []
  if (value !== source.newPwd) {
    errors.push(
      new Error('新密码和确认密码不一致！')
    )
  }
  callback(errors)
}

export const changePwdRule = {
  oldPwd: { type: 'string', message: '旧密码不能为空！', required: true },
  newPwd: [
    { type: 'string', message: '新密码不能为空！', required: true },
    { min: 6, max: 20, message: '密码长度应在6～20位！', required: true }
  ],
  cfmPwd: [
    { type: 'string', message: '确认密码不能为空！', required: true },
    { validator: confirmPwd }
  ]
}
