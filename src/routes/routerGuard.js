import router from './index'
import store from '@/store'
import {
    setaccessRoutes
} from '@/store/modules/userInfo'
import {
    asyncRoutes
} from './index'
import {
    filterAsyncRoutes
} from '@/utils/asyncRouter.js'

const whiteList = ['/login', '/home', '/patient']
// const whiteList = ['/login','/index','/patient','/home','/subscribe','/doctorWorkStation','/storehouse','/storehouse/storehouseInfo','/consultingroom',]
router.beforeEach((to, from, next) => {
    // console.log("in");
    // 获取用户登录的token
    const token = store.getters['token/accessToken'];
    if(to.path==="/")
        next("/home")
    // 判断当前用户是否登录
    if (token) {
        if (to.path === '/login') {
            next()
        } else {
            //从store中获取用户角色
            // const hasRoles = store.getters.roles && store.getters.roles.length > 0
            const hasRoles = store.getters['userInfo/getUserInfo'].roles;
            console.log(hasRoles);
            const hasRoutes = store.getters['userInfo/getRoutes'];
            console.log(hasRoutes);

            if (hasRoles.length!=0&&hasRoutes.length!=0) {
                next()
            } else {
                try {
                    // 获取用户角色
                    const roles = store.getters['userInfo/getUserInfo'].roles;

                    // 通过用户角色，获取到角色路由表
                    const accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
                    console.log(',,,,,,,,,', ...accessRoutes);
                    // router.addRoute(...accessRoutes)
                    router.$addRoutes = (...accessRoutes) => {
                        // router.matcher = new Router({ mode: 'history' }).matcher
                        router.addRoutes([...accessRoutes[0].children])
                    }
                    // 存储到vuex
                    store.commit('userInfo/setaccessRoutes', [...accessRoutes[0].children])
                    // console.log(router);
                    next({
                        ...to,
                        replace: true
                    })
                } catch (error) {
                    console.log(error);
                    // 清除用户登录信息后，回跳到登录页去
                    // next(`/login?redirect=${to.path}`)
                    next(`/login`)

                }
            }
        }
    } else {
        //用户未登录
        if (whiteList.indexOf(to.path) !== -1) {
            console.log(whiteList.indexOf(to.path) !== -1)
            // 需要跳转的路由是否是whiteList中的路由，若是，则直接条状
            next()
        } else {
            // 需要跳转的路由不是whiteList中的路由，直接跳转到登录页
            // next(`/login?redirect=${to.path}`)
            next(`/login`)
        }
    }
})