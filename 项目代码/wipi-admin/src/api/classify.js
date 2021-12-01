import request from '@/utils/request'

// 获取所有分类管理
export function getCategoryList(query) {
  return request({
    url: '/api/category',
    method: 'get'
  })
}

// 添加分类
export function addCategory(data) {
  return request({
    url: '/api/category',
    method: 'post',
    data
  })
}

// 修改分类
export function editCategory(data) {
  return request({
    url: `/api/category/${data.id}`,
    method: 'patch',
    data
  })
}

// 删除分类
export function delCategory(id) {
  return request({
    url: `/api/category/${id}`,
    method: 'delete'
  })
}
