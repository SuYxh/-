module.exports = app => {
    const mongoose = require('mongoose');
    // 链接数据库
    mongoose.connect('mongodb://localhost:27017/node-vue-wzry',{useNewUrlParser:true})

    // 引用了models文件夹下所有的js文件，防止有时候用的模型没有引入而报错,使用的插件为require-all
    require('require-all')(__dirname + '/../models')

}