// 页面管理

import request from '../utils/request'

// export function getPage(data) {
//   return request({
//     url: '/api/page',
//     method: 'get',
//     params:data
//   })
// }

export function getPage(data) {
  return request({
    url: '/api/page',
    method: 'get',
    params: data
  })
}
