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
    },
    
    GetPatientVisitList(createPatientVisitForm)
    {
        console.log(createPatientVisitForm);
        {
            return ajax.post('/api/patientVisit/GetPatientVisitList',{...createPatientVisitForm});
        }
    },
    //下诊断
    CreatePatientDisposal(PatientDisposal)
    {
        console.log(PatientDisposal);
        {
            return ajax.post('/api/patientVisit/CreatePatientDisposal',{...PatientDisposal});
        }
    },

    //获取诊断清单详情
    GetDisposalDetailInfo(PatientVisitId)
    {
        return ajax.get('/api/patientVisit/GetDisposalDetailInfo?PatientVisitId='+PatientVisitId+'');
    },

    //获取患者历史病历
    GetPatientVisitCompletedList(patientId)
    {
        return ajax.get('/api/patient/GetPatientVisitCompletedList?patientId='+patientId+'');

    }
};