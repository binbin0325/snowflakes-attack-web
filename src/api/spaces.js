import request from '@/utils/request'

export function getSpaces(userName,publics){
  return request({
    url: '/space/user/'+userName+"/public/"+publics,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function updateSpaces(data){
  return request({
    url: '/space',
    method: 'put',
    data:data,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function delSpaces(id){
  return request({
    url: '/space/'+id,
    method: 'delete',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}
