const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 根路径处理
app.get('/', (req, res) => {
  res.send('Proxy server is running. Use /image to fetch the latest image.');
});

// 处理图片代理请求，返回最新的图片
app.get('/image', async (req, res) => {
  try {
    // 获取最新的图片 URL
    const imageUrl = `https://xialiu.cn/api/dan`; // 这里是你提供的 API 地址

    // 发起请求来获取图片数据
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer' // 获取二进制图片数据
    });

    // 设置图片的 Content-Type，根据图片类型调整
    res.set('Content-Type', 'image/jpg'); // 如果返回的是其他格式的图片，修改这里
    res.send(response.data); // 将图片数据返回给浏览器
  } catch (error) {
    console.error('Error fetching the image:', error);
    res.status(500).send('Error fetching the image');
  }
});

// 启动代理服务器
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
