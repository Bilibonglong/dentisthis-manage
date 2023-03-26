import ajax from '../utils/request';

export default {
    
    //获取患者信息
    GetPatienInfo(PatienForm)
    {
        return ajax.post('/api/patient/GetPatienInfo',{...PatienForm});
    },

    //创建患者病历
    CreatePatientVisit(createPatientVisitForm)
    {
        console.log(createPatientVisitForm);
        {
            return ajax.post('/api/patientVisit/CreatePatientVisit',{...createPatientVisitForm});
        }
    }
};