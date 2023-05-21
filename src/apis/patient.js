import ajax from '../utils/request';

export default {

    //获取患者信息
    GetPatienInfo(PatienForm) {
        return ajax.post('/api/patient/GetPatienInfo', {
            ...PatienForm
        });
    },

    //创建患者病历
    CreatePatientVisit(createPatientVisitForm) {
        {
            return ajax.post('/api/patientVisit/CreatePatientVisit', {
                ...createPatientVisitForm
            });
        }
    },

    //获取病人门诊集合
    GetPatientVisitList(PatientVisitForm) {
        return ajax.post('/api/patientVisit/GetPatientVisitList', {
            ...PatientVisitForm
        });
    },
    //下诊断
    CreatePatientDisposal(PatientDisposal) {

        return ajax.post('/api/patientVisit/CreatePatientDisposal', {
            ...PatientDisposal
        });
    },
    //新增病人
    AddPatient(PatienForm) {
        return ajax.post('/api/patient/AddPatien', {
            ...PatienForm
        });
    },
    //删除病人
    DeletePatient(PatienIds) {
        return ajax.post('/api/patient/DeletePatien', PatienIds);
    },
    //获取诊断清单详情
    GetDisposalDetailInfo(PatientVisitId) {
        return ajax.get('/api/patientVisit/GetDisposalDetailInfo?PatientVisitId=' + PatientVisitId + '');
    },

    //获取患者历史病历
    GetPatientVisitCompletedList(patientId) {
        return ajax.get('/api/patient/GetPatientVisitCompletedList?patientId=' + patientId + '');
    }
};