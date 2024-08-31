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

/**
 * @description 删除记录
 */
export const deleteConsumeAPI = (id) => {
  return instance({
    url: `/consumes/${id}`,
    method: 'delete'
  })
}

/**
 * @description 收入筛选
 */
export const getFilterIncomeAPI = (info) => {
  return instance({
    url: '/income/conditions',
    method: 'get',
    params: info
  })
}

/**
 * @description 支出筛选
 */
export const getFilterOutcomeAPI = (info) => {
  return instance({
    url: '/outcome/conditions',
    method: 'get',
    params: info
  })
}

/**
 * @description 新增条目
 */
export const addConsumeAPI = (info) => {
  return instance({
    url: '/consumes',
    method: 'post',
    data: info
  })
}

/**
 * @description 修改条目
 */
export const updateConsumeAPI = (info, id) => {
  return instance({
    url: `/consumes/${id}`,
    method: 'put',
    data: info
  })
}
