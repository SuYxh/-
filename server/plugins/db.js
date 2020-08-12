module.exports = app => {
    const mongoose = require('mongoose');
    // 链接数据库
    mongoose.connect('mongodb://118.126.96.227:27017/node-vue-wzry',{useNewUrlParser:true})
}