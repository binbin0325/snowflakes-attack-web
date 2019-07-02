import request from '@/utils/request';

export function createProject(query) {
  return request({
    url: '/project',
    method: 'post',
    data: query,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function getProject() {
  return request({
    url: '/project',
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function getAllProject(spaceId) {
  return request({
    url: '/allProject/'+spaceId,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}
