<template>
  <div class="category">
      <h1> {{id ? '编辑':'新建'}}文章 </h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="所属分类">
              <el-select v-model="model.categories" multiple>
                  <el-option 
                  v-for="item in categories" 
                  :key="item._id" 
                  :label="item.name"     
                  :value="item._id">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="标题">
              <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="详情">
              <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
              <!-- <el-input type="textarea" v-model="model.body"></el-input> -->
          </el-form-item>
          <el-form-item>
              <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    /**
     * 编辑和新增用一个组件，在save()方法中通过是否含有id来判断是新增还是编辑
     * 编辑的时候数据反写，路由传参，传递 id 通过id查询 
    */
    components: {
        VueEditor
    },
    props: {
        id: { },
    },
    data(){
        return {
            model:{},
            categories:[]
        }
    },
    created () {
        this.fetchCategories()
        // 前面的条件满足后 在执行后面的 fetch（）方法
        this.id && this.fetch()
    },
    methods: {
        async save(){
            let res
            if (this.id) {
                // 存在id说明是编辑
                res = await this.$http.put(`rest/articles/${this.id}`,this.model)
            } else {
                // 新增
                // 请求接口 提交数据   
                // 注意判断一下 model 是否有值
                res = await this.$http.post('rest/articles',this.model)
            }
            this.$router.push('/articles/list')
            this.$message({
                type:'success',
                message:'保存成功！'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/articles/${this.id}`)
            this.model = res.data
        },
        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },

        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)
            //  cursorLocation 光标位置
            const formData = new FormData();
            //  "file" 表示的是上传的字段名称，和后端保持一致
            formData.append("file", file);
            const res = await this.$http.post('upload',formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();  // 重置上传的东西
        }
    },
}
</script>

<style>

</style>