import request from '@/utils/request'
export function getsearch(page = 1, pageSize = 12, options = {}) {
  return request({
    url: '/api/search',
    method: 'get',
    params: {
      page,
      pageSize,
      ...options
    }
  })
}
export function getdelsearch(id) {
  return request({
    url: `/api/search/${id}`,
    method: 'delete'
  })
}
