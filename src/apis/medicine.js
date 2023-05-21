import ajax from '../utils/request';
export default
{
    GetMedicines(MedicinesForm)
    {
        return ajax.post('/api/Medicine/GetMedicines',MedicinesForm)
    },
    updateMedicine(MedicinesForm)
    {
        return ajax.post('/api/Medicine/UpdateMedicine',MedicinesForm)
    },
    AddMedicine(MedicinesForm)
    {
        return ajax.post('/api/Medicine/AddMedicine',MedicinesForm)
    },
    deleteMedicines(MedicineIds)
    {
        return ajax.post('/api/Medicine/DeleteMedicine',MedicineIds)
    }
}