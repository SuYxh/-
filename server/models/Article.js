const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  title: { type: String },
  body: { type: String },
}, {
  // timestamps 将会自动带上 文件的创建时间和更新时间
  timestamps: true
})

module.exports = mongoose.model('Article', schema)