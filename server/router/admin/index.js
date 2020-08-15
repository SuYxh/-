/**
 *   req.params.resource：[获取出来的是小写，如： Cannot find module '../../models/categories']
 *   inflection@1.12.0  :   将 categories 转化成 类名  还可以处理单复数的转换、格式转换等
 *      const modelName = require('inflection').classify(req.params.resource)
        const Model = require(`../../models/${modelName}`)
        将这个做成中间件 放在 app.use('/admin/api/rest/:resource',{ 中间件 },router)

    http-assert 包来进行 报错处理 
    assert(参数一，参数二，参数三)  
    参数一： 确保用户存在
    参数二：如果 不存在 给出什么样的状态码
    参数三： 错误提示消息
 */

module.exports = app => {
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser');
    
    // express 的子路由
    const router = express.Router({ mergeParams:true })  // 把父级的参数合并到url里面来
    // const  req.Model = require('../../models/ req.Model')

    // 创建资源
    router.post('/', async (req,res) => {
        // 创建数据，通过   req.Model.create()  , 数据来源： req.body
    //    const Model = require(`../../models/${req.params.resource}`)
       const model = await  req.Model.create(req.body)
       res.send(model)
    })

    // 编辑/更新 资源
    router.put('/:id', async (req,res) => {
        
        const model = await  req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    // 删除资源
    router.delete('/:id', async (req,res) => {
        await  req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })

    // 资源列表
    router.get('/', async (req,res) => {
        // populate() 关联字段查询 好像  加不加 populate() 有什么区别 看看接口返回的数据 加了返回的是一个对象
        // const modelName = require('inflection').classify(req.params.resource)
        // const Model = require(`../../models/${modelName}`)
    //    console.log(req.params.resource,modelName)
    //    const items = await req.Model.find().populate('parent').limit(10)
    let queryOptions = {}
    // 模型上有一个属性 它的名称是什么 就是 module.exports = mongoose.model('Category',schema) 其中的额 Category
    if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
       res.send(items)
    })

    // 查询单个资源详情
    router.get('/:id', async (req,res) => {
        // 
        const model = await  req.Model.findById(req.params.id)
        res.send(model)
    })

    // 登录校验中间件
    const authMiddleware  =  require('../../middleware/auth')();

    // 获取模型的中间件
    const resourceMiddleware = require('../../middleware/resource')();

    //  这里加了2个中间件，请求资源的时候，先看看 是否是登录状态，在判断一下 模型是否存在 ，在挂在路由
    app.use('/admin/api/rest/:resource',authMiddleware,resourceMiddleware,router)

    /**
     * 文件上传失败的原因： 我们只在axios请求拦截器中携带了token，在上传中并没有携带，所以报错了
     * 解决方案： 在admin目录的main.js 中 使用 Vue.mixin()中写一个获取token的方法，当然也可以写成data，
     * 但是由于响应式系统的原因，可能后来没法带上token，所以写成方法；然后在上传图片中加入 :headers="getAuthHeaders()"
     * 使其带上 token
     */
    const multer = require('multer');
    // 上传中间件 dest 表示上传到哪里去
    const upload = multer({dest: __dirname + '/../../uploads'})
    // 中间件 upload.single() 表示单个文件的上传，里面的字段名为 在network中上传接口中 FormData 字段名
    app.post('/admin/api/upload',authMiddleware,upload.single('file'),async (req,res) => {
        // express 本身处理不了上传的数据，这里采用 multer 来进行处理 ，上传的文件二进制可在 network接口中查看
        const file = req.file
        // 地址一定是 服务端 的地址 ，如果想让服务端的地址可以访问 一定需要配置路由
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    // 登录的接口 路由
    app.post('/admin/api/login',async (req,res) => {
        // 传递过来的数据为 {username: "admin", password: "123456"} 
        // 将我们需要的字段解构出来
        const {username,password} = req.body  
        // 拿着数据去数据库查找有没有
        // 1.根据用户名找用户
        // 因为在AdminUser模型中设置了select:false，所以这里需要使用 select('+password') 来讲密码选出来，下面会用他进行校验
        // 前缀 - 被排除 ，前缀 + 被强制选择
        const user =await AdminUser.findOne({username}).select('+password') 
        console.log(user)
        //  1.1 判断用户是否存在，存在则进行下一步，不存在则抛出异常，给前端返回 用户不存在
        assert(user,422,'用户不存在！')
        // if (!user) {
        //     // 422 表示客户端提交的数据有问题
        //     return res.status(422).send({
        //         message:'用户不存在！'
        //     })
        // }
        // 2.校验 密码 , 因为通过使用 bcrypt 进行加密的，所以在 通过 bcrypt 进行校验
        //  compareSync(明文,密文)
        const isValid = require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,'用户名或者密码错误')

        // if (!isValid) {
        //     return res.status(422).send({
        //         message:'用户名或者密码错误！'
        //     })
        // }
        // 3.返回 token 使用 jsonwebtoken 的包
        
        // sign 签名 用来生成 token ，
        // sign(参数一,参数二) 
        // 参数一：要加入token中的信息,任何信息均可
        // 参数二：生成的token的时候，给定的秘钥，密钥作为全局变量，在index.js中进行定义，方便维护
        const token =  jwt.sign({id:user._id},app.get('secret'))


        res.send({token,username})
    })




    // 错误处理函数
    app.use(async (err,req,res,next) => {
        console.log(err)
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}

