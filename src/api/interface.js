import request from '@/utils/request';

export function editInterface(query,id) {
  return request({
    url: '/interface/'+id,
    method: 'post',
    data: query,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function sendInterface(id,envGroupId) {
  return request({
    url: '/interface/item/'+id+'/envGroup/'+envGroupId,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function sendInterfaceBatch(id,envGroupId) {
  return request({
    url: '/interfaceBatch/item/'+id+'/envGroup/'+envGroupId,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function getInterfaceForMenuId(id) {
  return request({
    url: '/interface/menu/item/'+id,
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function attackInterface(query) {
  return request({
    url: '/attack',
    method: 'post',
    data:query,
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}

export function getAttackReport(query) {
  return request({
    url: '/attack/report/'+query+'?bucket=0ms,500ms,800ms,1s,1.5s,2s,2.5s,3s,4s,5s,6s,7s,8s,9s,10s,11s,12s,13s,14s,15s,16s,17s,18s,19s,20s,21s,22s,23s,24s,25s,26s,27s,28s,29s,30s',
    method: 'get',
    baseURL: 'http://127.0.0.1:80/api/v1'
  })
}
