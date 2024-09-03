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
export const analysisAPI = (info) => {
  return instance({
    url: `/aistream?memId=${info.memId}&date=${info.date}&type=${info.type}`,
    method: 'post'
  })
}

/**
 * @description 清除记录
 */
export const clearAiAPI = () => {
  return instance({
    url: '/aistream/clear',
    method: 'get'
  })
}
