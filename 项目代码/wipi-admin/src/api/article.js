import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/article',
    method: 'get',
    params: query
  })
}

export function delArticle(id) {
  return request({
    url: '/api/article/' + id,
    method: 'delete'
  })
}

export function fetchItem(id) {
  return request({
    url: '/api/article/' + id,
    method: 'get'
  })
}

export function createArticle(data) {
  return request({
    url: '/api/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
