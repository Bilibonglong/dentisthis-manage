
import ajax from '../utils/request';

export default {
    //新增预约
    AddReservation(ReservationForm) {
        return ajax.post('/api/Reservation/AddReservation', {
            ...ReservationForm
        });
    },

    //获取预约列表
    GetRreservationList(ReservationForm) {
        return ajax.post('/api/Reservation/GetRreservationList', {
            ...ReservationForm
        })
    },
    //预约分诊
    RreservationTriage(ReservationForm)
    {
        return ajax.post('/api/Reservation/RreservationTriage', {
            ...ReservationForm
        })
    },
}