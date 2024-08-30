export function formatDate(dateString) {
  if (dateString === '') return ''
  // 创建 Date 对象
  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString)
    return 'Invalid Date'
  }

  // 格式化日期
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // getMonth() 从 0 开始
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
