import Vue from "vue";
import Vuex from "vuex";

//vue的数据持久化插件
import createPersistedstate from "vuex-persistedstate";
Vue.use(Vuex);

//require.context(文件的路径，是否遍历文件的子目录，匹配文件的正则)接受三个参数
const modulesFiles = require.context('./modules', true, /\.js$/);

//keys() 从数组中创建一个数组迭代对象， 该对象包含了数组的键：
//reduce(fn,可选。传递给函数的初始值)接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
//传入的函数==》 fn(total, currentValue, index, arr)
// total 必需。 初始值, 或者计算结束后的返回值。
// currentValue 必需。 当前元素
// currentIndex 可选。 当前元素的索引
// arr 可选。 当前元素所属的数组对象。
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    modules[moduleName] = modulesFiles(modulePath).default;
    return modules;
}, {});


const store = new Vuex.Store({
    modules: modules,
    plugins: [
        createPersistedstate({
            key: 'dynamicTagData',
            paths: ['tab.tabsList'],
        }),
        createPersistedstate({
            key: 'activeName',
            paths: ['tab.activeName'],
        }),
        createPersistedstate({
            key: 'userData', //key是存储数据的键名
            paths: ["userInfo.userInfo"], //paths是存储在state中的数据，如果是模块下的数据需要加上模块名，如user.token
        }),
        createPersistedstate({
            key: 'tokenData',
            paths: ["token.tokenInfo"],
        }),
    ]
})
export default store;