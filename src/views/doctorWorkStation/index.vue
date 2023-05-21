<template>
    <div class="doctorWorkStationContent">
        <div class="editbar">
            <div class="edit_btn">
                <el-button type="info" size="mini" class="el-icon-circle-plus-outline"
                    @click="GetPatientVisitList(this.user.userId)">我的分诊患者</el-button>
            </div>
            <div class="edit_query">
                <el-input size="mini" label-width="80px" placeholder="姓名/手机号/病历号" v-model="queryForm.contains"></el-input>
                <el-button type="primary" @click="GetPatientVisitList()" size="mini">查找</el-button>
                <el-button type="primary" @click="Refresh()" size="mini">重置</el-button>
            </div>
        </div>
        <el-table :data="this.table.patienList" border style="width: 100%" :height="400">
            <el-table-column type="selection" width="55"> </el-table-column>

            <el-table-column prop="patientId" label="患者编号">
            </el-table-column>
            <el-table-column prop="patientName" label="患者姓名">
            </el-table-column>
            <el-table-column prop="patienVisitId" label="病历号">
            </el-table-column>
            <el-table-column prop="doctorName" label="主治医生">
            </el-table-column>
            <el-table-column prop="patientVisitStatus" label="就诊状态">
            </el-table-column>
            <el-table-column prop="" label="患者主诉">
            </el-table-column>

            <el-table-column prop="visitDate" label="就诊日期">
            </el-table-column>



            <el-table-column prop="age" label="年龄">
                <template slot-scope="scope">
                    {{ scope.row.age + "岁" }}
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                    {{ scope.row.sex == 1 ? "男" : "女" }}
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号">
            </el-table-column>

            <el-table-column prop="sourceStr" label="患者来源">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="145px">
                <template slot-scope="scope">

                    <el-button v-if="scope.row.patientVisitStatus === '新建挂号'" @click="AddDisposal(scope.row)" type="text"
                        size="small">下处置</el-button>
                    <el-button v-if="scope.row.patientVisitStatus === '待结算'"
                        @click="OpenRemittance(scope.row.patienVisitId)" type="text" size="small">收费</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="table.total"
                :page-sizes="[5, 10, 15, 20]" :current-page="queryForm.page" :page-size="queryForm.row"
                layout="total, sizes, prev, pager, next, jumper" background>
            </el-pagination>
        </div>



        <!--医生下处置对话框-->
        <el-dialog id="AddDisposal" title="下处置" center :visible.sync="dialogObject.AddDisposal"
            :close-on-click-modal="false" :fullscreen="true">

            <div>
                患者:{{ this.patientForm.patientName }}
                <br />
                问诊医生:{{ this.patientForm.doctorName }}
            </div>

            <el-steps :active="1" style="width:50%;margin:0px auto;">
                <el-step title="步骤 1" description="下处置"></el-step>
                <el-step title="步骤 2" description="划账"></el-step>
                <el-step title="步骤 3" description="就诊完成"></el-step>
            </el-steps>
            <el-divider></el-divider>
            <div>
                <el-row>
                    <el-col :span="12">
                        <el-descriptions class="margin-top" :column="8" size="mini" style="width:100%" :border="true"
                            title="患者主诉">
                            <el-descriptions-item>
                                <el-input size="mini" type="textarea" :rows="3"
                                    v-model="PatientDisposal.ChiefComplaint"></el-input>
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-col>
                    <el-col :span="12">
                        <el-descriptions class="margin-top" :column="8" size="mini" style="width:100%" :border="true"
                            title="医生诊断">
                            <el-descriptions-item>
                                <el-input size="mini" type="textarea" :rows="3"
                                    v-model="PatientDisposal.Symptom"></el-input>
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-descriptions class="margin-top" :column="8" size="mini" style="width:100%" :border="true"
                            title="医生医嘱">
                            <el-descriptions-item>
                                <el-input size="mini" type="textarea" :rows="3"
                                    v-model="PatientDisposal.Diagnosis"></el-input>
                            </el-descriptions-item>
                        </el-descriptions>
                    </el-col>
                    <el-col :span="12">
                        <!-- 费用信息 -->
                        <el-descriptions title="诊费明细">
                            <el-descriptions-item label="总费用" :column="2">{{ FeeInfo.total }}</el-descriptions-item>
                            <el-descriptions-item label="医疗项目" :column="5">{{ FeeInfo.item }}</el-descriptions-item>
                            <el-descriptions-item label="药物清单" :column="5">{{ FeeInfo.medicine }}</el-descriptions-item>
                        </el-descriptions>
                    </el-col>
                </el-row>
            </div>
            <el-tabs style="height: 230px;">
                <el-tab-pane label="医疗项目">
                    <el-table :header-cell-style="{ 'text-align': 'center' }" border="" :data="this.table.HealItemList"
                        height="200px" ref="Itemtable" @selection-change="selectItemRows">
                        <el-table-column type="selection" width="50" align="center"> </el-table-column>
                        <el-table-column prop="itemId" label="项目编号" align="center"> </el-table-column>
                        <el-table-column prop="itemName" label="项目名称" align="center"> </el-table-column>
                        <el-table-column prop="itemDsc" label="类别" align="center"> </el-table-column>
                        <el-table-column prop="itemPrice" label="项目价格" align="center"> </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="药物库">
                    <el-table :header-cell-style="{ 'text-align': 'center' }" border="" :data="this.table.MedicineList"
                        height="200px" @selection-change="selectMedicineRows">
                        <el-table-column type="selection" width="50" align="center"> </el-table-column>
                        <el-table-column prop="medicineId" label="药物编号" align="center"> </el-table-column>
                        <el-table-column prop="medicineName" label="项目名称" align="center"> </el-table-column>
                        <el-table-column prop="medicineDsc" label="类别" align="center"> </el-table-column>
                        <el-table-column prop="medicinePrice" label="项目价格" align="center"> </el-table-column>
                        <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                        <el-table-column prop="itemCount" label="剩余库存" align="center"> </el-table-column>

                        <el-table-column prop="needCount" label="开药数量" align="center">
                            <template slot-scope="scope">
                                <el-input-number type="number" size="mini" v-model.number="scope.row.needCount"
                                    @change="medicineCountChange(scope.$index, scope.row)"></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <el-divider></el-divider>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogObject.AddDisposal = false">取 消</el-button>
                <el-button type="primary" @click="CreateDisposal()">下 诊 断</el-button>
            </div>
        </el-dialog>
        <el-dialog id="Remittance" title="收费" center :visible.sync="dialogObject.Remittance" :close-on-click-modal="false"
            :fullscreen="true">

            <el-steps :active="2" style="width:50%;margin:0px auto;" process-status="success">
                <el-step title="步骤 1" description="下处置"></el-step>
                <el-step title="步骤 2" description="收费"></el-step>
                <el-step title="步骤 3" description="就诊完成"></el-step>
            </el-steps>
            <el-descriptions class="margin-top" title="收费信息" :column="4" direction="vertical">
                <el-descriptions-item label="患者">{{ this.patientForm.patientName }}</el-descriptions-item>
                <el-descriptions-item label="问诊医生">{{ this.patientForm.doctorName }}</el-descriptions-item>
                <el-descriptions-item label="收费时间">{{ new Date() }}</el-descriptions-item>
            </el-descriptions>
            <el-card class="box-card">
                <el-table :header-cell-style="{ 'text-align': 'center' }" border="" :data="this.table.DisposalDetail"
                    height="300px" ref="DisposalDetail" show-summary>
                    <el-table-column prop="itemName" label="项目名称" align="center"> </el-table-column>
                    <el-table-column prop="itemType" label="类别" align="center"> </el-table-column>
                    <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                    <el-table-column prop="count" label="数量" align="center"> </el-table-column>
                    <el-table-column prop="price" label="项目价格" align="center"> </el-table-column>
                </el-table>
            </el-card>

            <el-card class="box-card">
                <el-descriptions title="" :column="4">
                    <el-descriptions-item label="付款方式">
                        <el-select v-model="Remittance.PaymentType" placeholder="请选择" size="mini">
                            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                            </el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item label="收款总额">{{ Remittance.TotalPrice }}</el-descriptions-item>
                    <el-descriptions-item label="找零"></el-descriptions-item>
                </el-descriptions>
            </el-card>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogObject.Remittance = false">取 消</el-button>
                <el-button type="primary" @click="CreateRevenueOrder()">收费</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
    components: {},
    computed: { 
        ...mapState('userInfo',['userInfo'])
    },
    props: {},
    mounted() {
        this.user = this.userInfo;
        console.log(this.user.userId);
    },
    data() {
        return {
            selectedOptions: [],
            queryForm: {
                page: 1,
                row: 10,
                doctorId: '',
                contains: '',
            },
            currentRow: null,
            table: {
                patienList: [],
                HealItemList: [],
                MedicineList: [],
                DisposalDetail: [],
                total: 0,
            },
            cities: [
                {
                    value: '现金',
                    label: '现金'
                }, {
                    value: '微信',
                    label: '微信'
                }, {
                    value: '支付宝',
                    label: '支付宝'
                }
            ],
            FeeInfo: {
                total: 0,
                itemprice: 0,
                medicineprice: 0,
                item: '',
                medicine: '',
                complaint: '',
            },
            //患者处置信息
            PatientDisposal: {
                ChiefComplaint: '',//患者主诉
                Symptom: '',//患者症状
                Diagnosis: '',//医嘱
                Items: [],//就诊项目
                Medicines: [],//开药清单
            },
            dialogObject: {
                AddDisposal: false,
                Remittance: false
            },
            patientRegistrationForm: {},
            patientForm: {
                patienVisitId: '',
                patientId: '',
                patientName: '',
                sex: 0,
                age: 0,
                address: '',
                phoneNumber: '',
                areadata: '',
                source: '',
            },
            Remittance: {
                PaymentType: '',
                TotalPrice: 0,
                patienVisitId: '',
            },
            usre: {},
        };
    },
    methods: {
        loadData() {
            this.GetPatientVisitList();
        },

        //第一行默认选中
        defaultChecked() {
            var that = this;
            that.$nextTick(() => {
                that.$refs.Itemtable.toggleRowSelection(this.table.HealItemList[0], true);
            });
        },

        //获取已分诊的患者信息
        async GetPatientVisitList(byDoctor) {
            const patientForm = {
                Page: this.queryForm.page,
                Row: this.queryForm.row,
                Contains: this.queryForm.contains,
                VisitDoctorId: byDoctor??"",
            }
            await this.$api.patient.GetPatientVisitList(patientForm).then((res) => {
                const { returnData, success, message } = res.data;
                console.log(res.data);
                if (!success) {
                    return;
                }
                this.table.patienList = returnData;
            });
        },

        //获取医疗项目列表
        async GetHealItemInfo() {
            await this.$api.healItem.GetHealItemInfo({Row:100,Page:1}).then((res) => {
                const { returnData, success, message } = res.data;
                if (!success) {
                    return;
                }
                this.table.HealItemList = returnData;
            });
        },
        //获取药物清单列表
        async GetMedicines() {
            await this.$api.medicine.GetMedicines({Row:100,Page:1}).then((res) => {
                const { returnData, success, message } = res.data;
                console.log(res.data);
                if (!success) {
                    return;
                }
                this.table.MedicineList = returnData;
            });
        },
        //下诊断
        async CreateDisposal() {
            const DisposalData = {
                PatienVisitId: this.patientForm.patienVisitId,
                Fee: this.FeeInfo.total,
                VisitItems: this.FeeInfo.item.replace(/\n/g, ""),
                VisitDoctorId: this.patientForm.doctorName,
                ChiefComplaint: this.PatientDisposal.ChiefComplaint,
                Symptom: this.PatientDisposal.Symptom,
                Diagnosis: this.PatientDisposal.Diagnosis,
                Medicines: this.PatientDisposal.Medicines
            }
            await this.$api.patient.CreatePatientDisposal(DisposalData).then((res) => {
                const { success, message } = res.data;
                if (success) {
                    this.dialogObject.AddDisposal = false;
                    this.OpenRemittance(DisposalData.PatienVisitId)
                    this.dialogObject.Remittance = true
                    this.loadData();
                } else {
                    return;
                }
            })
        },

        //获取诊断清单详情
        async GetDisposalDetailInfo(patienVisitId) {
            await this.$api.patient.GetDisposalDetailInfo(patienVisitId).then((res) => {
                const { returnData, success, message } = res.data;
                if (!success) {
                    return;
                }
                this.table.DisposalDetail = returnData;
                this.Remittance.TotalPrice = returnData.reduce((acc, obj) => acc + obj.price, 0);
            });
        },
        //创建收费单信息
        async CreateRevenueOrder() {
            const Revenue = {
                SourceNumber: this.Remittance.patienVisitId,
                PaymentType: this.changePayType(this.Remittance.PaymentType),
                Income: this.Remittance.TotalPrice,
            }

            await this.$api.finance.CreateRevenueOrder(Revenue).then((res) => {
                const { returnData, success, message } = res.data;
                if (!success) {
                    this.$message.error(message);
                    return;
                }
                else {
                    this.$alert('收费完毕,已生成营业单', '收费提醒', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.dialogObject.Remittance = false
                            this.loadData();
                        }
                    });
                }
            });
        },
        AddDisposal(row) {
            this.patientForm = { ...row };
            this.defaultChecked();
            this.GetHealItemInfo();
            this.GetPatientVisitList();
            this.GetMedicines();
            this.dialogObject.AddDisposal = true;
        },

        OpenRemittance(patienVisitId) {
            console.log("下诊断成功");
            this.Remittance.patienVisitId = '';
            this.Remittance.patienVisitId = patienVisitId;
            this.GetDisposalDetailInfo(patienVisitId);
            this.dialogObject.Remittance = true
        },
        selectMedicineRows(row) {
            console.log(row);
            this.PatientDisposal.Medicines = [];
            row.forEach(item => {
                console.log(typeof (item));
                this.PatientDisposal.Medicines.push({ MedicineId: item.medicineId, Count: item.needCount })
            })
            this.FeeInfo.medicineprice = 0;
            this.FeeInfo.medicine = '';
            row.forEach(item => {
                this.FeeInfo.medicineprice += item.medicinePrice * item.needCount
                this.FeeInfo.medicine += item.medicineName + ";" + "\n"
            });
            this.FeeInfo.total = this.FeeInfo.medicineprice + this.FeeInfo.itemprice;
            console.log(this.PatientDisposal.Medicines);
        },

        selectItemRows(row) {
            console.log(row);
            this.PatientDisposal.Items = [];//初始化items
            row.forEach(x => {
                this.PatientDisposal.Items.push(x.itemName)
            })
            this.FeeInfo.itemprice = 0;
            this.FeeInfo.item = '';
            row.forEach(item => {
                this.FeeInfo.itemprice += item.itemPrice
                this.FeeInfo.item += item.itemName + ";" + "\n"
            });
            this.FeeInfo.total = this.FeeInfo.medicineprice + this.FeeInfo.itemprice;

            console.log(this.PatientDisposal.Items);
        },

        medicineCountChange(index, row) {
        },
        //重置搜索条件
        Refresh() {
            this.queryForm.contains = '';
            this.loadData();
        },

        // handleRowClick(row) {
        //     console.log(row);
        //     // 取消其它行的选中状态
        //     this.table.HealItemList.forEach((item) => {
        //         this.$set(item, 'selection', false);
        //     });
        //     // 选中当前行
        //     this.$set(row, 'selection', true);
        // },
        //条数改变
        handleSizeChange(row) {
            this.queryForm.row = row;
            this.loadData();
        },
        //页数改变
        handleCurrentChange(page) {
            this.queryForm.page = page;
            this.loadData();
        },

        changePayType(PaymentType) {
            if (PaymentType === "现金") {
                return 1;
            }
            if (PaymentType === "微信") {
                return 2;
            }
            if (PaymentType === "支付宝") {
                return 3;
            }
        },
    },
    created() {
        this.loadData();
    },
};
</script>
<style lang="less" scoped>
.doctorWorkStationContent {
    width: 100%;
    height: 100%;

    .editbar {
        width: 100%;
        margin: 5px 0px;
        padding: 2px 0px;
        display: grid;
        grid-template-columns: 2fr 1.5fr;

        .edit_btn {
            display: flex;
            flex-direction: row;
        }

        .edit_query {
            width: 100%;
            display: grid;
            grid-template-columns: 2fr 2fr 0.3fr 0.3fr;
            grid-column-gap: 5px;
        }
    }

    .editform {
        width: 40%;
        overflow: hidden;
    }


}
</style>