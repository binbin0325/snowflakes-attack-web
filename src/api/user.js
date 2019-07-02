import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUser(){
  return request({
    url: '/user',
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function updateUser(data){
  return request({
    url: '/user',
    method: 'put',
    data:data,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function delUser(id){
  return request({
    url: '/user/'+id,
    method: 'delete',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}
