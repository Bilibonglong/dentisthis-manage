import ajax from '../utils/request';
export default
{
    GetMedicines()
    {
        return ajax.post('/api/Medicine/GetMedicines')
    }
}