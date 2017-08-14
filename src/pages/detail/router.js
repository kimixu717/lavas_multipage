/**
 * @file detail router
 * @author KimiXu(xuyujin@banggood.cn)
 */

import Detail from '@/pages/detail/Detail.vue';

export default {
    routes: [
        {
            path: '/detail/:id',
            name: 'detail',
            component: Detail,
            meta: {
                notKeepAlive: true
            }
        }
    ]
};
