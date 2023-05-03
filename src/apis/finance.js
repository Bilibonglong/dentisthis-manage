import ajax from '../utils/request';
export default
{
    CreateRevenueOrder(revenue)
    {
        console.log(revenue);
        return ajax.post('/api/Revenue/CreateRevenueOrder',{...revenue})
    },
    GetRevenueOrderList()
    {
        return ajax.get("/api/Revenue/GetRevenueOrderList");
    }
}