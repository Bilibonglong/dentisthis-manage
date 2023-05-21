import ajax from '../utils/request';
export default
{
    GetHomeData()
    {
        return ajax.get('/api/home/GetHomeData')
    },
    GetMyTask()
    {
        return ajax.get('/api/home/GetMyTask')
    },

    GetMessageInfo()
    {
        return ajax.get('/api/home/GetMessageInfo')
    },
}