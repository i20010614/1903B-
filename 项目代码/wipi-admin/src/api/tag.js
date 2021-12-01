import request from '@/utils/request'

// 添加标签
export function addTag(data) {
  return request({
    url: '/api/tag',
    method: 'post',
    data
  })
}
// 请求标签列表
export function reqTaglist(query) {
  return request({
    url: '/api/tag',
    method: 'get'
  })
}

// 修改标签
export function editTag(data) {
  return request({
    url: `/api/tag/${data.id}`,
    method: 'patch',
    data
  })
}

// 删除标签
export function delTag(id) {
  return request({
    url: `/api/tag/${id}`,
    method: 'delete'
  })
}
