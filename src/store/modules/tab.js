export default {
    namespaced:false,
    state: {
        isCollapse: false, //控制菜单的展开还是收起

        //面包屑
        tabsList: [
            {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
        }
    ]
    },
    mutations: {
        //修改菜单张开收起
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        //更新面包屑
        setBreadcrumb(state,value){

            console.log(value);
            //判断添加数据是否为首页
            if(value.name!=="home")
            {
                const index= state.tabsList.findIndex(item=>item.name===value.name)
                console.log(index);
                //如果不存在
                if(index===-1)
                {
                    state.tabsList.push(value);
                }
            }
        }
    }
}