export default {
    namespaced: true,

    //提供唯一的公共数据源，所有的数据统一放到store的state进行存储，相似于data
    state: {
        userInfo: {},
    },
    //getters是store的计算属性。
    getters: {
        getUserInfo(state) {
            if (state.userInfo == null) {
                return null;
            }
            return state.userInfo;
        },
    },

    //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：
    //每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。
    //这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
    mutatinons: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        clearUserInfo(state) {
            localStorage.removeItem('userData');
        },
    },
    actions: {},
};