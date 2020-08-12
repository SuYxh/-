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

    // 分类列表
    router.get('/categories', async (req,res) => {
        // 
       const items = await Category.find().limit(10)
       res.send(items)
    })

    app.use('/admin/api',router)
}