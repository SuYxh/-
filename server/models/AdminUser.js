const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  // 默认不让密码查出来 select:false,
  // set 是一个函数，怎么保存该值，这里对密码进行加密处理
  // 如果密码为空 不会被散列
  password: { type: String , select:false , set(val){
    // val 表示用户原来输入的值
    // 需要安装 bcrypt 模块， 用于做 密码的散列
    // hashSync(val,10) 同步方法， 第二个参数表示 加密指数，一般使用 10~12 越高越安全，但是越耗时
    return require('bcrypt').hashSync(val,10)
  }},
})

module.exports = mongoose.model('AdminUser', schema)