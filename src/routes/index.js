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
                children: []
            },
            //患者
            {
                path: '/patient',
                name: 'patient',
                component: () => import('@/views/patient'),
                meta: {
                    title: '患者管理',
                    isAuth: true
                }
            },

            //预约
            {
                path: '/subscribe',
                name: 'subscribe',
                component: () => import('@/views/subscribe'),
                meta: {
                    title: '预约',
                    isAuth: true
                }
            },
            //库房
            {
                path: '/storehouse',
                name: 'index',
                component: () => import('@/views/storehouse'),
                meta: {
                    title: '库房管理',
                    isAuth: true
                }
            },
            //预约
            {
                path: '/consultingroom',
                name: 'consultingroom',
                component: () => import('@/views/consultingroom'),
                meta: {
                    title: '预约',
                    isAuth: true
                },
                children: [{
                        path: 'employee',
                        name: 'employee',
                        component: () => import('@/views/consultingroom/views/employee'),
                        meta: {
                            title: '员工管理'
                        },
                    },
                    {
                        path: 'role',
                        name: 'role',
                        component: () => import('@/views/consultingroom/views/role'),
                        meta: {
                            title: '角色管理'
                        },
                    },
                    {
                        path: 'setting',
                        name: 'setting',
                        component: () => import('@/views/consultingroom/views/setting'),
                        meta: {
                            title: '诊所设置'
                        },
                    }
                ]
            },

        ]
    }
]

const router = new VueRouter({
    routes,
});

export default router;