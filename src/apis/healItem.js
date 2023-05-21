import ajax from '../utils/request';
export default
{
    GetHealItemInfo(HealItemForm)
    {
        console.log(HealItemForm);
        return ajax.post('/api/HealItem/GetHealItemInfo',HealItemForm)
    },
    UpdateHealItem(HealItemForm)
    {
        return ajax.post('/api/HealItem/UpdateHealItem',HealItemForm)
    },
    AddHealItem(HealItemForm)
    {
        return ajax.post('/api/HealItem/AddHealItem',HealItemForm)
    },
    DeleteHealItem(HealItemIds)
    {
        return ajax.post('/api/HealItem/DeleteHealItem',HealItemIds)
    }
}