module.exports = app => {
    const express = require('express');
    // express 的子路由
    const router = express.Router()
    const Category = require('../../models/Category')

    // 创建分类
    router.post('/categories', async (req,res) => {
        // 创建数据，通过  Category.create()  , 数据来源： req.body
       const model = await Category.create(req.body)
       res.send(model)
    })

    // 编辑分类 -- 更新
    router.put('/categories/:id', async (req,res) => {
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    // 编辑分类 -- 删除
    router.delete('/categories/:id', async (req,res) => {
        await Category.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })

    // 分类列表
    router.get('/categories', async (req,res) => {
        // populate() 关联字段查询 好像  加不加 populate() 有什么区别 看看接口返回的数据 加了返回的是一个对象
       const items = await Category.find().populate('parent').limit(10)
       res.send(items)
    })

    // 获取分类详情
    router.get('/categories/:id', async (req,res) => {
        // 
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api',router)
}