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
}