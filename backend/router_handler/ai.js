// 步骤一，获取access_token
const apiKey = 'VIS0kF5O5YidoI0V6pUTC25t';
const secretKey = 'skqJdZhUGOLfaLXgDCvf1vIwwjQYXIUX';
const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`;
const axios = require('axios')

let msgList = []

exports.clearMsgList = (req, res) => {
  msgList = []
  return res.send({
    status:200,
    msg:'清除记忆成功',
  })
}

exports.financialHelper = (req, res) => {
  // 从前端获取用户输入的内容
  // const userMessage = req.body.message;
  msgList.push({role:'user',content:req.body.message}) 

  axios.post(tokenUrl)
    .then(response => {
      const accessToken = response.data.access_token;

      // 步骤二，调用API
      const apiUrl = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro';

      const requestUrl = `${apiUrl}?access_token=${accessToken}`;

      const requestData = {
        messages: msgList,
        // [
        //   { role: 'user', content: userMessage }
        // ],
        max_output_tokens: 2048
        // req.body.mode 确定模型的类型，可选值为：true 分析，false 生成理财建议
        // system: '你是分析管理收支财产的ai助手, ' + req.body.mode ? '请根据提供的messages分析收支内容' : '请根据提供的messages生成理财建议'
      };

      console.log(msgList)

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };


      return axios.post(requestUrl, requestData, config);
    })
    .then(response => {
      msgList.push({role:'assistant',content:response.data.result})
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    });
}