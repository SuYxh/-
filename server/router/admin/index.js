/**
 *   req.params.resource：[获取出来的是小写，如： Cannot find module '../../models/categories']
 *   inflection@1.12.0  :   将 categories 转化成 类名  还可以处理单复数的转换、格式转换等
 *      const modelName = require('inflection').classify(req.params.resource)
        const Model = require(`../../models/${modelName}`)
        将这个做成中间件 放在 app.use('/admin/api/rest/:resource',{ 中间件 },router)
 */

module.exports = app => {
    const express = require('express');
    // express 的子路由
    const router = express.Router({ mergeParams:true })  // 把父级的参数合并到url里面来
    // const  req.Model = require('../../models/ req.Model')

    // 创建分类
    router.post('/', async (req,res) => {
        // 创建数据，通过   req.Model.create()  , 数据来源： req.body
    //    const Model = require(`../../models/${req.params.resource}`)
       const model = await  req.Model.create(req.body)
       res.send(model)
    })

    // 编辑分类 -- 更新
    router.put('/:id', async (req,res) => {
        
        const model = await  req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    // 编辑分类 -- 删除
    router.delete('/:id', async (req,res) => {
        await  req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })

    // 分类列表
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

    // 获取分类详情
    router.get('/:id', async (req,res) => {
        // 
        const model = await  req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource',
        async (req,res,next) => {
            const modelName = require('inflection').classify(req.params.resource)
            req.Model = require(`../../models/${modelName}`)
            next()
        } 
    ,router)

    const multer = require('multer');
    // 上传中间件 dest 表示上传到哪里去
    const upload = multer({dest: __dirname + '/../../uploads'})
    // 中间件 upload.single() 表示单个文件的上传，里面的字段名为 在network中上传接口中 FormData 字段名
    app.post('/admin/api/upload',upload.single('file'),async (req,res) => {
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
        const AdminUser = require('../../models/AdminUser');
        // 因为在AdminUser模型中设置了select:false，所以这里需要使用 select('+password') 来讲密码选出来，下面会用他进行校验
        // 前缀 - 被排除 ，前缀 + 被强制选择
        const user =await AdminUser.findOne({username}).select('+password') 
        console.log(user)
        //  1.1 判断用户是否存在，存在则进行下一步，不存在则抛出异常，给前端返回 用户不存在
        if (!user) {
            // 422 表示客户端提交的数据有问题
            return res.status(422).send({
                message:'用户不存在！'
            })
        }
        // 2.校验 密码 , 因为通过使用 bcrypt 进行加密的，所以在 通过 bcrypt 进行校验
        //  compareSync(明文,密文)
        const isValid = require('bcrypt').compareSync(password,user.password)
        if (!isValid) {
            return res.status(422).send({
                message:'用户名或者密码错误！'
            })
        }
        // 3.返回 token 使用 jsonwebtoken 的包
        const jwt = require('jsonwebtoken');
        // sign 签名 用来生成 token ，
        // sign(参数一,参数二) 
        // 参数一：要加入token中的信息,任何信息均可
        // 参数二：生成的token的时候，给定的秘钥，密钥作为全局变量，在index.js中进行定义，方便维护
        const token =  jwt.sign({id:user._id},app.get('secret'))


        res.send({token,username})
    })
}

