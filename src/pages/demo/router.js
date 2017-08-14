/**
 * @file demo router
 * @author KimiXu(xuyujin@banggood.cn)
 */

// 定义切割点，异步加载路由组件，/* webpackChunkName: "demo" */这段注释用于分组。
// 注意：如果此页面路由组件过多，建议分割，没几个就算了，不分割使用10-11行写法
const Demo = () => import(/* webpackChunkName: "demo" */ '@/pages/demo/Demo.vue')
const User = () => import(/* webpackChunkName: "user" */ '@/pages/demo/User.vue')
// import Demo from '@/pages/demo/Demo.vue'
// import User from '@/pages/demo/User.vue'

export default {
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/demo/user',
      name: 'user',
      component: User
    }
  ]
}
