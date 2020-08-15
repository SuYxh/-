import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
    timeout: 5000,
    // headers: headers
})


// 请求拦截器
http.interceptors.request.use(config => {
// Do something before request is sent
    // config.headers.Authorization = localStorage.token  //这样不是很规范
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(response => {
// Do something before response is sent
return response;
},error => {
// Do something with response error
// element ui 的方法

if (error.response.data.message) {
    Vue.prototype.$message({
        type:'error',
        message:error.response.data.message
    })  
}
console.log(error.response.data.message)

if (error.response.status === 401) {
    router.push('/login')
}


return Promise.reject(error);
});

export default http