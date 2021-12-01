import request from '@/utils/request'
export function getfile({ page = 1, pageSize = 12, options = {}}) {
  return request({
    url: '/api/file',
    method: 'get',
    params: {
      page,
      pageSize,
      ...options
    }
  })
}
export function getdelfile(id) {
  return request({
    url: `/api/file/${id}`,
    method: 'delete'
  })
}
