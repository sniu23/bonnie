import fetch from '@/utils/fetch'

export function list({ code, name, valid }) {
  return fetch({
    url: '/role',
    method: 'get',
    params: { code, name, valid }
  })
}

export function get({ code }) {
  return fetch({
    url: '/role',
    method: 'get',
    params: { code }
  })
}

export function make(row) {
  return fetch({
    url: '/role',
    method: 'post',
    data: row
  })
}

export function edit(row, { code }) {
  return fetch({
    url: '/role/' + code,
    method: 'post',
    data: row
  })
}

export function drop({ code }) {
  return fetch({
    url: '/role/' + code,
    method: 'delete'
  })
}
