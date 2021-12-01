import request from '@/utils/request'
// 评论管理
export function getComment(page = 1, pageSize = 12, options = {}) {
  return request({
    url: '/api/comment',
    params: {
      page,
      pageSize,
      ...options
    }
  })
}

// 通过,拒绝
export function passComment(id, data) {
  return request({
    url: `/api/comment/${id}`,
    method: 'patch',
    data
  })
}

// 删除
export function deleteComment(id) {
  return request({
    url: `/api/comment/${id}`,
    method: 'delete'
  })
}

//
export function commentChildren(data) {
  return request({
    url: '/api/comment',
    method: 'post',
    data
  })
}
