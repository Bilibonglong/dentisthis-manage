import ajax from '../utils/request';
export default {
    GetStorehousesList(form) {
        return ajax.post("/api/Stock/GetStorehousesList",form);
    },

    UpdateStorehouses(form) {
        return ajax.post("/api/Stock/UpdateStorehouses",form);
    },
    AddStorehouses(form)
    {
        return ajax.post("/api/Stock/AddStorehouses",form);
    },
    DeleteStorehouses(ids)
    {
        return ajax.post("/api/Stock/Deletehouses",ids);
    },
}