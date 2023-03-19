import ajax from '../utils/request';

export default {
    GetEmployeeList(page,row,conditions)
    {
        return ajax.post('/api/User/GetUserInfo',{
            Page:page,
            Row:row,
            Conditions:conditions
        });
    },
    
    AddUserInfo(userForm)
    {
        return ajax.post('/api/User/AddUserInfo',{
            ...userForm
        });
    },
};