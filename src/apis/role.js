
import ajax from '../utils/request';
export default{
    GetRolesList()
    {
        return ajax.get("/api/Role/GetRolesList");
    }
}