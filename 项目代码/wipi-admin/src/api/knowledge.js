import request from '@/utils/request'

// 新建请求
export function getKnowledge(page = 1, pageSize = 12, options = {}) {
  return request({
    url: '/api/Knowledge',
    params: {
      page,
      pageSize,
      ...options
    }
  })
}
// 删除
// /api/Knowledge/{id}
export function deleteKnowledge(id) {
  return request({
    url: `/api/Knowledge/${id}`,
    method: 'delete'
  })
}
// 草稿,上线
// /api/Knowledge/{id}
export function patchKnowledge(id, data) {
  return request({
    url: `/api/Knowledge/${id}`,
    method: 'patch',
    data
  })
}
