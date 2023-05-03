
import ajax from '../utils/request';

export default {
    //下诊断
    AddReservation(ReservationForm) {
        return ajax.post('/api/Reservation/AddReservation', {
            ...ReservationForm
        });
    },

    GetRreservationList(ReservationForm) {
        return ajax.post('/api/Reservation/GetRreservationList', {
            ...ReservationForm
        })
    }
}