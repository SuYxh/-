module.exports = app => {
    const mongoose = require('mongoose');
    // 链接数据库
    mongoose.connect('mongodb://118.126.96.227:27017/node-vue-wzry',{useNewUrlParser:true})

    // 防止有时候用的模型没有引入而报错
    require('require-all')(__dirname + '/../models')

}