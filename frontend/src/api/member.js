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
