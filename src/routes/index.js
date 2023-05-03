import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);
// const VueRouterPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(to) {
//     return VueRouterPush.call(this, to).catch((err) => err);
// };

//再次点击当前路由时判断
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch((err) => err);
};

//在单页面应用中，网页具体路径显示是由vue-router配置中 path决定的，path设置的是什么就显示什么，和name无关。

export const defaultRouter = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: {
        title: '登录',
    }
}, ]

export const asyncRoutes = [{
    path: '/index',
    name: 'index',
    component: () => import('@/layout/index'),
    //meta的定义：简单来说就是路由元信息，也就是每个路由身上携带的信息。
    meta: {
        title: '',
        roles: ["Admin", "Doctor"]
    },
    children: [
        //首页
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/home'),
            meta: {
                title: '首页',
                roles: ["Admin", "Doctor"]
            },
        },
        //患者
        {
            path: '/patient',
            name: 'patient',
            component: () => import('@/views/patient'),
            meta: {
                title: '患者',
            }
        },

        //预约
        {
            path: '/subscribe',
            name: 'subscribe',
            component: () => import('@/views/subscribe'),
            meta: {
                title: '预约',
            }
        },
        //医生工作站
        {
            path: '/doctorWorkStation',
            name: 'doctorWorkStation',
            component: () => import('@/views/doctorWorkStation'),
            meta: {
                title: '医生工作站',
            }
        },

        //库房
        {
            path: '/storehouse',
            name: 'index',
            component: () => import('@/views/storehouse'),
            meta: {
                title: '库房管理',
                roles: ["Admin"]
            },
            children: [{
                path: '/storehouseInfo',
                name: 'storehouseInfo',
                component: () => import('@/views/storehouse/views/storehouseInfo'),
                meta: {
                    title: '库房信息'
                },
            }]
        },
        //诊所管理
        {
            path: '/consultingroom',
            name: 'consultingroom',
            component: () => import('@/views/consultingroom'),
            meta: {
                title: '预约',
                roles: ["Admin"]
            },
            children: [{
                    path: '/employee',
                    name: 'employee',
                    component: () => import('@/views/consultingroom/views/employee'),
                    meta: {
                        title: '员工管理'
                    },
                },
                {
                    path: '/role',
                    name: 'role',
                    component: () => import('@/views/consultingroom/views/role'),
                    meta: {
                        title: '角色管理',
                    },
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () => import('@/views/consultingroom/views/setting'),
                    meta: {
                        title: '诊所设置'
                    },
                },
                {
                    path: '/finance',
                    name: 'finance',
                    component: () => import('@/views/consultingroom/views/finance'),
                    meta: {
                        title: '营收管理'
                    },
                }
            ]
        },
        //系统设置
        {
            path: '/system',
            name: 'system',
            component: () => import('@/views/system'),
            meta: {
                title: '系统设置',
            },
            children: [{
                    path: '/healItem',
                    name: 'healItem',
                    component: () => import('@/views/system/views/healItem'),
                    meta: {
                        title: '医疗项目'
                    },
                },
                {
                    path: '/role',
                    name: 'role',
                    component: () => import('@/views/consultingroom/views/role'),
                    meta: {
                        title: '角色管理'
                    },
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: () => import('@/views/consultingroom/views/setting'),
                    meta: {
                        title: '诊所设置'
                    },
                }
            ]
        },
    ]
}]

const router = new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: defaultRouter
})
export default router