import request from '@/utils/request'
export function getmail({ page = 1, pageSize = 12, options = {}}) {
  return request({
    url: '/api/smtp',
    method: 'get',
    params: {
      page,
      pageSize,
      ...options
    }
  })
}
export function getdelmail(id) {
  return request({
    url: `/api/smtp/${id}`,
    method: 'delete'
  })
}
