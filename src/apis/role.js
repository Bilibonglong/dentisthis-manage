import ajax from '../utils/request';
export default {
    GetRolesList() {
        return ajax.get("/api/Role/GetRolesList");
    },

    DeleteRoleList(roleIds) {
        return ajax.post("api/Role/DeleteRoleList", roleIds)
    },
    //新增病人
    AddRole(RoleFrom) {
        return ajax.post('/api/Role/AddRoleList',RoleFrom);
    },

    //修改病人
    updateRole(RoleFrom) {
        return ajax.post('/api/Role/UpdateRoleList',RoleFrom);
    },
}