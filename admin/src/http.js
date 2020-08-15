import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
    timeout: 5000,
    // headers: headers
})

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
return Promise.reject(error);
});

export default http