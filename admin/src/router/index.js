import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        path: '/categories/create',
        name: 'category_create',
        component: () => import('../views/CategoryEdit.vue')
      },
      {
        path: '/categories/edit/:id',
        name: 'category_edit',
        component: () => import('../views/CategoryEdit.vue'),
        props:true
      },
      {
        path: '/categories/list',
        name: 'category_list',
        component: () => import('../views/CategoryList.vue')
      },
      // 物品
      {
        path: '/items/create',
        name: 'items_create',
        component: () => import('../views/ItemEdit.vue')
      },
      {
        path: '/items/edit/:id',
        name: 'items_edit',
        component: () => import('../views/ItemEdit.vue'),
        props:true
      },
      {
        path: '/items/list',
        name: 'items_list',
        component: () => import('../views/ItemList.vue')
      },
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
