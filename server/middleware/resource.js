/**
 * 这个中间件的做法 同 用户认证一样
 * 
 */

 module.exports = options => {
     return async (req,res,next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
 }