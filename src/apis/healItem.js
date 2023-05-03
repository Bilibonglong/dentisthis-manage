import ajax from '../utils/request';
export default
{
    GetHealItemInfo()
    {
        return ajax.post('/api/HealItem/GetHealItemInfo')
    }
}