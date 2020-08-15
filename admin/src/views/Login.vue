<template>
  <div class="login-container">
      <el-card class="login-card" >
          <div slot="header">
              <span>请先登录</span>
          </div>
          <el-form @submit.native.prevent="login">
              <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                  <el-input type="password" v-model="model.password"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" native-type="submit">登录</el-button>
              </el-form-item>
          </el-form>
          
      </el-card>
      
  </div>
</template>

<script>
export default {
    data() {
        return {
            model:{}
        }
    },
    methods: {
        async login() {
            // 登录失败的弹窗提示，放在了 axios的响应拦截器中进行处理
            // 请求数据
            console.log(this.model)
            // res 应该是一个token  post() 中的第二个参数是表单的数据
            const res = await this.$http.post('login',this.model)
            console.log(res)
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                type:'success',
                message:`登陆成功！欢迎您~~${res.data.username}！`
            })
        }
    },
}
</script>

<style>
.login-card{
    width: 25rem;
    margin: 5rem auto;
}
</style>