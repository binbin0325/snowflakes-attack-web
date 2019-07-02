import request from '@/utils/request';

export function createInterfaceGroup(query) {
  return request({
    url: '/interfaceGroup',
    method: 'post',
    data: query,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function getMenu(query) {
  return request({
    url: '/menu/' + query,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}
