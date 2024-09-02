import instance from '@/utils/instance'

/**
 * @description 对话型 ai
 */
export const chatAPI = (message) => {
  return instance({
    url: '/ai',
    method: 'post',
    data: { message }
  })
}

/**
 * @description 数据分析 ai
 */
export const analysisAPI = (message) => {
  return instance({
    url: '/ai',
    method: 'post',
    data: { message }
  })
}

/**
 * @description 清除记录
 */
export const clearAiAPI = () => {
  return instance({
    url: '/ai/clear',
    method: 'get'
  })
}
