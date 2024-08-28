import instance from '@/utils/instance.js'

/**
 * @description 登录接口
 * @param {Object} params
 * @returns {Object}
 */
export const loginAPI = ({ account, password }) => {
  return instance({
    url: '/user/login',
    method: 'post',
    params: { username: account, password: password }
  })
}
