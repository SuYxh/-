/*
module.exports = async (req,res,next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token,401,'请提供 jwt-token')
    const { id } = jwt.verify(token,app.get('secret'))  // 返回的数据的样式： { id: '5f375ab04c8f6e6870044365', iat: 1597463746 }
    console.log(id)
    assert(id,401,'无效的token')
    req.user = await AdminUser.findById(id)
    assert(req.user,401,'用户不存在')
    await next()
}

    存在的问题 ：  不要直接写成这样，如果我后面只想用到中间件的其中一个功能怎么办？如果 模型不是 AdminUser 该如何去换？
    解决方案： 返回一个函数

*/


module.exports = options => {
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser');

    return async (req,res,next) => {
        // 检验用户是否登陆
        // const token = req.headers.authorization
        // console.log(token)   
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzc1YWIwNGM4ZjZlNjg3MDA0NDM2NSIsImlhdCI6MTU5NzQ2Mzc0Nn0.Dbx2ngp9-vJYaOabwy_qJa6RlqeVRqmV2xEYBVHW0ZI
        // 需要提取token 所以换一种写法 split(' ') 使用 空格 进行分割，分割完成后变成了数组，然后在使用pop() ,pop() 可以提取最后一个元素
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,'请提供 jwt-token')
        // console.log(token) 
        // 接下来进行 token验证 看看这个token是不是 服务器颁发的 ，客户端有没有进行篡改
        // decode(token) 对 token 进行解析，但是不会验证对错，不是很安全
        // verify(参数一，参数二)  对于token 进行校验 ，参数一： 需要校验的token 参数二：我们原来设置的 秘钥
        //  这里的req.app 和 app 是完全等同的
        const { id } = jwt.verify(token,req.app.get('secret'))  // 返回的数据的样式： { id: '5f375ab04c8f6e6870044365', iat: 1597463746 }
        console.log(id)
        assert(id,401,'无效的token')
        // const user = await AdminUser.findById({id})  如果想让 user 后续也能使用，需要将其挂载到req上
        req.user = await AdminUser.findById(id)
        // 上面步骤中的 token id req.user 其中任意一个不存在 都要做报错处理
        // 这里采用 http-assert 包来进行处理
        assert(req.user,401,'用户不存在')
        await next()
    }
}

