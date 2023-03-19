export default {
  state: {
    isCollapse: false, //控制侧边栏的开关
    //头部导航默认为首页，面包屑数据
    tabsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
      },
    ],
    activeName: '',
    currentMenu: null,
  },
  mutations: {
    //修改侧边栏开关方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    //更新面包屑数据
    selectMenu(state, val) {
      state.activeName = val.name;
      if (val.name !== 'home') {
        state.currentMenu = val;
        const result = state.tabsList.findIndex((item) => item.name === val.name);
        if (result === -1) {
          state.tabsList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    //删除指定的tag标签
    closeTag(state, item) {
      const closeIndex = state.tabsList.findIndex((val) => val.name === item.name);
      const currentIndex = state.tabsList.findIndex((val) => val.name === state.activeName);
      state.tabsList.splice(closeIndex, 1);
      if (item.name == state.activeName && currentIndex !== 0) {
        state.activeName = state.tabsList[closeIndex - 1]['name'];
      }
    },
    //点击tag跳转对应路由
    updateActiveName(state, item) {
      state.activeName = item.name;
    },
  },
};
