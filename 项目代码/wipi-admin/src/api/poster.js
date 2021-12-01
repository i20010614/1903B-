import request from '@/utils/request'

export function getPoster(page = 1, pageSize = 12) {
  return request({
    url: '/api/poster',
    params: {
      page,
      pageSize
    }
  })
}
