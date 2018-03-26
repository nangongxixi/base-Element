<<<<<<< HEAD
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home'

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '/column',
        component: resolve => require(['../views/column'], resolve)
      },
      {
        path: '/article',
        component: resolve => require(['../views/article'], resolve),
        children: [
          {
            path: '',
            component: resolve => require(['../views/articleList'], resolve)
          },
          {
            path: '/article/edit/:id',
            component: resolve => require(['../views/articleadd'], resolve)
          }
        ]
      },
      {
        path: '/order',
        component: resolve => require(['../views/Order'], resolve),
        children: [
          {
            path: '',
            component: resolve => require(['../views/orderList'], resolve)
          },
          {
            path: '/order/detail/:id',
            component: resolve => require(['../views/orderDetail'], resolve)
          }
        ]
      },
      {
        path: '/message',
        component: resolve => require(['../views/message'], resolve)
      },
      {
        path: '/employee',
        component: resolve => require(['../views/employee'], resolve)
      },
      {
        path: '/role',
        component: resolve => require(['../views/role'], resolve)
      },
      {
        path: '/user',
        component: resolve => require(['../views/user'], resolve)
      },
      {
        path: '/opinion',
        component: resolve => require(['../views/opinion'], resolve),
        children: [
          {
            path: '',
            component: resolve => require(['../views/opinionList'], resolve)
          },
          {
            path: '/opinion/detail/:id',
            component: resolve => require(['../views/opinionDetail'], resolve)
          },
          {
            path: '/opinion/edit/:id',
            component: resolve => require(['../views/opinionEdit'], resolve)
          }
        ]
      },
      {
        path: '/demo',
        component: resolve => require(['../views/Template'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: resolve => require(['../views/login'], resolve)
  }
]

export default new Router({
  linkActiveClass: 'link-active',
  mode: 'hash',
  base: __dirname,
  routes
})
=======
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home'

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: '/column',
        component: resolve => require(['../views/column'], resolve)
      },
      {
        path: '/article',
        component: resolve => require(['../views/article'], resolve),
        children: [
          {
            path: '',
            component: resolve => require(['../views/articleList'], resolve)
          },
          {
            path: '/article/edit/:id',
            component: resolve => require(['../views/articleadd'], resolve)
          }
        ]
      },
      {
        path: '/order',
        component: resolve => require(['../views/Order'], resolve),
        children: [
          {
            path: '',
            component: resolve => require(['../views/orderList'], resolve)
          },
          {
            path: '/order/detail/:id',
            component: resolve => require(['../views/orderDetail'], resolve)
          }
        ]
      },
      {
        path: '/message',
        component: resolve => require(['../views/message'], resolve)
      },
      {
        path: '/employee',
        component: resolve => require(['../views/employee'], resolve)
      },
      {
        path: '/role',
        component: resolve => require(['../views/role'], resolve)
      },
      {
        path: '/user',
        component: resolve => require(['../views/user'], resolve)
      },
      {
        path: '/opinion',
        component: resolve => require(['../views/opinion'], resolve),
        children: [
          {
            path: '',
            component: resolve => require(['../views/opinionList'], resolve)
          },
          {
            path: '/opinion/detail/:id',
            component: resolve => require(['../views/opinionDetail'], resolve)
          },
          {
            path: '/opinion/edit/:id',
            component: resolve => require(['../views/opinionEdit'], resolve)
          }
        ]
      },
      {
        path: '/demo',
        component: resolve => require(['../views/Template'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: resolve => require(['../views/login'], resolve)
  }
]

export default new Router({
  linkActiveClass: 'link-active',
  mode: 'hash',
  base: __dirname,
  routes
})
>>>>>>> 9ee7f171d869dbe4a6d8ccf57d5b233bdf231296
