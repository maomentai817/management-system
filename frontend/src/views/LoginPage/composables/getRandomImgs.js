import axios from 'axios'

// 获取随机图片的 URL
const getRandomImages = async (count) => {
  const imgPromises = Array.from({ length: count }, () =>
    axios
      .get('https://picsum.photos/310/160', { responseType: 'blob' })
      .then((response) => URL.createObjectURL(response.data))
  )

  const imgs = await Promise.all(imgPromises)
  return imgs
}

// 调用函数获取指定数量的随机图片
const imgs = await getRandomImages(10)

export default imgs
