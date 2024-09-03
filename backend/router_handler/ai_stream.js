const axios = require('axios');

let msgList = []

exports.clearMsgList = (req,res) => {
  msgList = []
  return res.send({
    status:200,
    msg:'清除记忆成功'
  })
}
// 获取 access_token 的函数
async function getAccessToken() {
    const url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=VIS0kF5O5YidoI0V6pUTC25t&client_secret=skqJdZhUGOLfaLXgDCvf1vIwwjQYXIUX";
    
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    };

    try {
        const response = await axios.post(url, {}, config);
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
    }
}

// 主函数
exports.financialHelper = async (req,res) => {

  msgList.push({role:'user',content:req.body.message})
  // console.log(req.body.message,msgList)
  const accessToken = await getAccessToken();
  const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro?access_token=${accessToken}`;
    
    
  const payload = {
    messages: msgList,
    // [
    //   {
    //     role: 'user',
    //     content: '给我推荐一些自驾游路线'
    //   }
    // ],
    stream: true
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream' // 确保接受流式响应
    },
    responseType: 'stream' // 确保 axios 以流的方式处理响应
  };

  try {
    const response = await axios.post(url, payload, config);
        
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let textRes = ''
    response.data.on('data', chunk => {
      const lines = chunk.toString().split('\n');
      // console.log(lines)
      lines.forEach(line => {
        if (line.startsWith('data:')) {
          const data = JSON.parse(line.replace('data: ', ''));
          data.result = data.result.replace(/\n/g,'🐱')

          if (data.result) {
            // 将每个字符单独发送
            for (const char of data.result) {
              res.write(`data: ${char}$`);
            }
            textRes += data.result.replace(/[\t\n*🐱]/g,'')
          }
          // console.log(JSON.stringify(data.result))
        }
      });
    });

    response.data.on('end', () => {
      msgList.push({role: 'assistant', content: textRes})
      // console.log('msgList after response: ',msgList)
      res.end(); // 结束响应
    });

  } catch (error) {
    console.error('Error during API call:', error);
    res.status(500).send('Internal Server Error');
  }
}


