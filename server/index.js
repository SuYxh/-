const express = require('express');

const app = express()

// 中间件
// 引入 cors 
app.use(require('cors')())

app.use(express.json())


// 后台的路由
require('./router/admin/index')(app);
// 引入数据库
require('./plugins/db')(app);




app.listen(3000,() => {
    console.log('服务已启动！http://localhost:3000')
})