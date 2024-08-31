import instance from '@/utils/instance'

/**
 * @description 获取成员信息接口
 */
export const getMemberAPI = () => {
  return instance({
    url: '/members',
    method: 'get'
  })
}

/**
 * @description 添加成员接口
 */
export const addMemberAPI = (info) => {
  return instance({
    url: '/members',
    method: 'post',
    data: info
  })
}
