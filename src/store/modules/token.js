export default {
    namespaced: true,
    //存放token状态
    state: {
        tokenInfo: {
            accessToken: "",
            expiresTime: 0,
        }
    },
    getters: {
        accessToken(state) {
            if (state.tokenInfo==null) {
                return null;
            }
            return state.tokenInfo.accessToken;
        },
        expiresTime(state) {
            if (state.tokenInfo == null) {
                return null;
            }
            return state.tokenInfo.expiresTime;
        },
    },

    //操作state成员
    mutations: {
        setTokenInfo(state, tokenInfo) {
            state.tokenInfo['accessToken'] = tokenInfo['accessToken'];
            state.tokenInfo['expiresTime'] = new Date().getTime() + tokenInfo['expiresTime'];
        },

        clearToken(state) {
            localStorage.removeItem("tokenData");
        },
    },
};