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

    DeleteUser(userId)
    {
        return ajax.post('/api/User/DeleteUser',{userId});
    },

    UpdateUserState(updateState)
    {
        return ajax.post('/api/User/UpdateUserState',{updateState})
    },

    updateUser(param)
    {
        return ajax.post('/api/User/UpdateUserInfo',{...param})
    },

    GetUserByRole()
    {
        return ajax.post('/api/User/GetUserByRole')
    }
};