import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      { path: '/articles/:id', 
        name: 'article', 
        component: () => import('../views/Article.vue'), 
        props: true 
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
