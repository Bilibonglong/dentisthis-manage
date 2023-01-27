import ajax from '../utils/request';

export default {
    login(userid,password)
    {
        return ajax.post('/api/Login/Login',{
            UserId:userid,
            PassWord:password
        });
    },
    
};