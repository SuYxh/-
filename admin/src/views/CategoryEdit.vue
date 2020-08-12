<template>
  <div class="category">
      <h1> {{id ? '编辑':'新建'}}分类 </h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="上级分类">
              <el-select v-model="model.parent">
                  <el-option 
                  v-for="item in parents" 
                  :key="item._id" 
                  :label="item.name"     
                  :value="item._id">
                  </el-option>
              </el-select>
          </el-form-item>
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
    /**
     * 编辑和新增用一个组件，在save()方法中通过是否含有id来判断是新增还是编辑
     * 编辑的时候数据反写，路由传参，传递 id 通过id查询 
    */
    props: {
        id: { },
    },
    data(){
        return {
            model:{},
            parents:[]
        }
    },
    created () {
        this.fetchParents()
        // 前面的条件满足后 在执行后面的 fetch（）方法
        this.id && this.fetch()
    },
    methods: {
        async save(){
            let res
            if (this.id) {
                // 存在id说明是编辑
                res = await this.$http.put(`rest/categories/${this.id}`,this.model)
            } else {
                // 新增
                // 请求接口 提交数据   
                // 注意判断一下 model 是否有值
                res = await this.$http.post('rest/categories',this.model)
            }
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message:'保存成功！'
            })
        },
        async fetch(){
            const res = await this.$http.get(`rest/categories/${this.id}`)
            this.model = res.data
        },
        async fetchParents(){
            const res = await this.$http.get(`rest/categories`)
            this.parents = res.data
        }
    },
}
</script>

<style>

</style>