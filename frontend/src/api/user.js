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

/**
 * @description 修改头像
 */
export const updateAvatarAPI = (baseStr, username) => {
  return instance({
    url: `/userinfo/avatar?username=${username}`,
    method: 'post',
    data: { avatar: baseStr }
  })
}

/**
 * @description 修改用户名
 */
export const updateUsernameAPI = (username, newUsername) => {
  return instance({
    url: `/userinfo/name?username=${username}`,
    method: 'post',
    data: { username: newUsername }
  })
}
