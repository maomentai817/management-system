import instance from '@/utils/instance.js'

/**
 * @description 登录接口
 * @param {Object} params
 * @returns {Object}
 */
export const loginAPI = ({ username, password }) => {
  return instance({
    url: '/login',
    method: 'post',
    data: { username: username, password: password }
  })
}
