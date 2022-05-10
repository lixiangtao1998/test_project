const express = require('express')
const app = express()

app.get('/api/lxt', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send({
    name: 'lixiangtao',
    comurl: 'baidu.com',
  })
})

app.listen(3000, () => {
  console.log('app listen 3000 port')
})
