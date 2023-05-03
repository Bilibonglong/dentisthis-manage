import ajax from '../utils/request';
export default {
    GetStorehousesList(itemname, itemtype) {
        return ajax.get("/api/Stock/GetStorehousesList",
        {
            params: {
                itemName:itemname,
                itemType:itemtype
            }
        });
    }
}