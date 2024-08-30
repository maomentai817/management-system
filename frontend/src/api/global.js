import instance from '@/utils/instance'

/**
 * @description 获取滑块验证图片
 */
export const getRandomPic = () => {
  return instance({
    url: '/pictures',
    method: 'get'
  })
}
