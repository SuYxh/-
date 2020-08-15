<template>
  <div class="category">
    <h1>{{id ? '编辑':'新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
              <el-select v-model="model.parent">
                  <el-option 
                  v-for="item in parents" 
                  :key="item._id" 
                  :label="item.name"     
                  :value="item._id">
                  </el-option>
              </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!--请求的api http://localhost:3000/admin/api/upload -->
        <!-- uploadUrl 和 getAuthHeaders() 在 main.js中进行的定义，方便使用 -->
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  created() {
    // this.fetchParents()
    // 前面的条件满足后 在执行后面的 fetch（）方法
    this.id && this.fetch();
  },
  methods: {
      handleSuccess(res){
          console.log(res)
          //使用 该语句，图片不能显示，原因是因为 vue中的响应式系统造成的，因为 model.icon 开始并不在响应式系统中后加进去的
          //   this.model.icon = res.url  
          this.$set(this.model,'icon',res.url)
        
      },
    async save() {
      let res;
      if (this.id) {
        // 存在id说明是编辑
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        // 新增
        // 请求接口 提交数据
        // 注意判断一下 model 是否有值
        res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功！",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    // async fetchParents(){
    //     const res = await this.$http.get(`rest/items`)
    //     this.parents = res.data
    // }
  },
};
</script>

<style>

</style>