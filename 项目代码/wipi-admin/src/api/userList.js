import request from '@/utils/request'
export function getsearch(obj) {
  return request({
    url: '/api/user',
    method: 'get',
    params: obj
  })
}

export function userupdate(item) {
  return request({
    url: `/api/user/update`,
    method: 'post',
    ...item
  })
}

