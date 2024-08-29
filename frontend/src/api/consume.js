import instance from '@/utils/instance'

/**
 * @description 获取消费记录接口
 */

export const getConsumeAPI = () => {
  return instance({
    url: '/consumes',
    method: 'get'
  })
}

/**
 * @description 获取收入记录接口
 */
export const getIncomeAPI = () => {
  return instance({
    url: '/consumes/income',
    method: 'get'
  })
}

/**
 * @description 获取支出记录接口
 */
export const getOutcomeAPI = () => {
  return instance({
    url: '/consumes/outcome',
    method: 'get'
  })
}

/**
 * @description 获取 tags
 */
export const getAllTagsAPI = () => {
  return instance({
    url: '/consumes/category',
    method: 'get'
  })
}
