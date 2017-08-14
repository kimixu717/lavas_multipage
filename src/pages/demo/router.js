/**
 * @file home router
 * @author KimiXu(xuyujin@banggood.cn)
 */

import Demo from '@/pages/demo/Demo.vue'
import User from '@/pages/demo/User.vue'

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
