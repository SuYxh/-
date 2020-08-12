<template>
  <div class="category">
      <h1>创建分类</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            model:{}
        }
    },
    methods: {
        async save(){
            // 请求接口 提交数据   
            // 注意判断一下 model 是否有值
            const res = await this.$http.post('categories',this.model)
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message:'保存成功！'
            })
        }
    },
}
</script>

<style>

</style>