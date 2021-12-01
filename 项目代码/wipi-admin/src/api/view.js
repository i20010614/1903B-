import request from '@/utils/request'
export function getsearch(obj) {
  return request({
    url: '/api/view',
    method: 'get',
    params: obj
  })
}

export function getdelsearch(id) {
  return request({
    url: `/api/view/${id}`,
    method: 'delete'
  })
}
