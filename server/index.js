const express = require('express');

const app = express()

// 设置token签名的一个密钥，改值应该放在 环境变量 中
app.set('secret','yxhhxy0912')

// 中间件
// 引入 cors 
app.use(require('cors')())

app.use(express.json())
// 静态文件
app.use('/uploads',express.static(__dirname + '/uploads'))


// 后台的路由
require('./router/admin/index')(app);
// 引入数据库
require('./plugins/db')(app);




app.listen(3000,() => {
    console.log('服务已启动！http://localhost:3000')
})