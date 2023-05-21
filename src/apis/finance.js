import ajax from '../utils/request';
export default
{
    CreateRevenueOrder(revenue)
    {
        console.log(revenue);
        return ajax.post('/api/Revenue/CreateRevenueOrder',{...revenue})
    },
    GetRevenueOrderList(revenue)
    {
        return ajax.post("/api/Revenue/GetRevenueOrderList",revenue);
    }
}