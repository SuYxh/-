const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    delay: { type: String },
    cost: { type: String },
    description: { type: String },
    tips: { type: String },
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String },
  }],
})

module.exports = mongoose.model('Hero', schema, 'heroes')


// const mongoose = require('mongoose');

// const schema = new mongoose.Schema({
//     // 英雄名称
//     name:{ type: String },
//     // 英雄头像
//     avatar:{ type: String },
//     // 英雄 绰号
//     title:{ type: String },
//     // 英雄分类
//     categories:[{ type: mongoose.SchemaTypes.ObjectId,ref:'Category' }],
//     // 英雄评分
//     scores:{
//         // 难度
//         difficult:{type:Number},
//         // 技能
//         skills:{type:Number},
//         // 攻击
//         attack:{type:Number},
//         // 生存
//         survive:{type:Number}
//     },
//     // 技能
//     skills:[{
//         // 技能图标
//         icon:{ type:String },
//         // 技能名称
//         name:{ type:String },
//         // 技能描述
//         description:{ type:String },
//         // 技能--小提示
//         tips:{ type:String }
//     }],
//     // items1 表示 顺风出装
//     items1:[{ type:mongoose.SchemaTypes.ObjectId ,ref:'Item' }],
//     // items2 表示 逆风出装
//     items2:[{ type:mongoose.SchemaTypes.ObjectId ,ref:'Item' }],
//     // 使用技巧
//     usageTips:{ type:String },
//     // 对抗技巧
//     battleTips:{ type:String },
//     // 团战思路
//     teamTips:{ type:String },
//     // 英雄关系--搭档
//     partners:[{
//         hero:{ type:mongoose.SchemaTypes.ObjectId ,ref:'Hero' },
//         description:{ type:String },
//     }],

// })

// module.exports = mongoose.model('Hero',schema,'heroes')