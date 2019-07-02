import request from '@/utils/request';

export function getEnvironmentGroup(query) {
  return request({
    url: '/environment/group/'+query,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function addEnvironmentGroup(query) {
  return request({
    url: '/environment/group',
    method: 'post',
    data: query,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}


export function delEnvironmentGroup(query) {
  return request({
    url: '/environment/group/'+query,
    method: 'delete',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}


export function addEnvironment(query) {
  return request({
    url: '/environment',
    method: 'post',
    data: query,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function getEnvironment(query) {
  return request({
    url: '/environment/groupId/'+query,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function delEnvironment(query) {
  return request({
    url: '/environment/env/'+query,
    method: 'delete',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}
