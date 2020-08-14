<template>
  <div class="category-list">
    <h1>文章列表</h1>
    <el-table :data="items">
      <!-- 可以加个判断 如果 parent为空 可以放在最前面 -->
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },
    async remove(row){
       this.$confirm(`是否要删除文章"${row.title}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          const res = await this.$http.delete(`rest/articles/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style>
</style>
