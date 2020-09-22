import request from '@/utils/request'

export function menuList(data) {
  return request({
    url: '/systemservice/v1/sys/menu/list',
    method: 'POST',
    data
  })
}

export function spaceDetail(data) {
  return request({
    url: '/archiveservice/v1/archive/space/get',
    method: 'POST',
    data
  })
}

export function getLayoutInfo(data) {
  return request({
    url: '/archiveservice/v1/archive/query/detail',
    method: 'POST',
    data
  })
}
