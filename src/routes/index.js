import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
//在单页面应用中，网页具体路径显示是由vue-router配置中 path决定的，path设置的是什么就显示什么，和name无关。
const routes = [{
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/',
        name: 'index',
        component: () => import('@/layout/index'),
        //meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
        meta: {
            title: '',
            isAuth: true
        },
        children: [
            //首页
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home'),
                meta: {
                    title: '首页',
                    isAuth: true
                },
            },

            //患者
            {
                path: '/patient',
                name: 'index',
                component: () => import('@/views/patient'),
                meta: {
                    title: '患者页面',
                    isAuth: true
                }
            },
            //用户
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/user'),
                meta: {
                    title: '用户页面',
                    isAuth: true
                }
            },
        ]
    }
]

const router = new VueRouter({
    routes,
});

export default router;