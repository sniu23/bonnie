import fetch from '@/utils/fetch'

export function ok() {
  return fetch({
    url: '/ok',
    method: 'get'
  })
}

export function login({ no, password }) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: { no, password }
  })
}

export function logout() {
  return fetch({
    url: '/user/logout',
    method: 'post'
  })
}

export function changePwd({ no, oldPwd, newPwd }) {
  return fetch({
    url: '/user/password',
    method: 'post',
    data: { no, oldPwd, newPwd }
  })
}

// axios's params = query, not have real params.

export function navigate() {
  return fetch({
    url: '/user/navigation',
    method: 'get'
  })
}

export function register({ no, name, password, mail, mobile }) {
  return fetch({
    url: '/user/register',
    method: 'post',
    data: { no, name, password, mail, mobile }
  })
}
