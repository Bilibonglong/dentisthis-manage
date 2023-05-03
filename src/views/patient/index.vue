<template>
  <div class="patientInfo_container">
    <el-tabs style="height: 200px;">



      <el-tab-pane label="全部患者">
        <div class="editbar">
          <div class="edit_btn">
            <el-button type="success" size="mini" class="el-icon-circle-plus-outline"
              @click="openAddDialog()">新增患者</el-button>
          </div>
          <div class="edit_query">
            <el-date-picker align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" size="mini">
            </el-date-picker>
            <el-input size="mini" label-width="80px" placeholder="姓名/手机号/病历号"></el-input>
            <el-button type="primary" @click="getPurchasePlanList()" size="mini">查找</el-button>
            <el-button type="primary" @click="Refresh()" size="mini">重置</el-button>
          </div>
        </div>
        <el-table :data="this.table.patienList" border style="width: 100%" :height="400">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="patientname" label="患者姓名">
          </el-table-column>
          <el-table-column prop="patientid" label="病历号">
          </el-table-column>
          <el-table-column prop="phonenumber" label="手机号">
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
          <el-table-column prop="lastvisitdate" label="创建日期">
          </el-table-column>
          <el-table-column prop="createdate" label="复诊日期">
          </el-table-column>

          <el-table-column prop="sourceStr" label="患者来源">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="145px">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">预约</el-button>
              <el-button type="text" size="small" @click="PatientRegistration(scope.row)">挂号</el-button>
              <el-button @click="CheckPatienHistory(scope.row)" type="text" size="small">查看病历</el-button>

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
        <!-- <RouterView></RouterView> -->

        <!-- 新增患者模态框 -->
        <el-dialog title="患者" center :visible.sync="dialogObject.addVisible" :close-on-click-modal="false" width="50%">
          <el-form :model="patientForm" ref="patientForm" label-width="80px">
            <el-form-item label="患者编号" prop="userId">
              <el-input v-model="patientForm.patientId" disabled placeholder="系统自动生成"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="patientForm.patientName"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="patientForm.sex" size="mini">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="患者来源">
              <el-select v-model="patientForm.source">
                <el-option v-for="item in patientSourceType" :label="item.label" :value="item.value"
                  :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input type="text" v-model="patientForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="省区">
              <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input type="text" v-model="patientForm.address"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="addPatient()">保存患者</el-button>
            <el-button type="success" @click="dialogObject.addVisible = false">保存并到达</el-button>
            <el-button type="success" @click="addPatient()">保存并预约</el-button>
            <el-button @click="dialogObject.addVisible = false">取 消</el-button>
          </div>
        </el-dialog>


        <!-- 患者分诊模态框 -->
        <el-dialog title="患者分诊" center :visible.sync="dialogObject.patientRegistration" :close-on-click-modal="false"
          width="60%">

          <div>
            <el-avatar :size="small"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span>{{ this.patientRegistrationForm.patientname }}</span>
          </div>

          <div>

            <span>请选择医生：</span>
            <el-table :data="this.table.userList" border style="width: 100%" :height="300"
              :row-class-name="tableRowClassName" @row-click="handleRowClick">
              <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
              <el-table-column prop="userId" fixed label="工号" align="center"> </el-table-column>
              <el-table-column prop="sex" label="性别" align="center">
                <template slot-scope="scope">
                  {{ scope.row.sex == 0 ? '男' : '女' }}
                </template>
              </el-table-column>

              <el-table-column prop="roleStr" label="职位" align="center"></el-table-column>
              <el-table-column label="在职状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.state === 0 ? '在职' : '停职' }}
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="CreatePatientVisit()">确 定</el-button>
            <el-button @click="dialogObject.patientRegistration = false">取 消</el-button>
          </div>
        </el-dialog>

        <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="60%">
          <el-container>
            <el-header>{{ this.patientHistory.patientName + "的历史病历" }}</el-header>
            <el-main>
              <el-card class="box-card" v-for="(item) in patientHistory" :key="item.patienVisitId" shadow="hover">
                <div slot="header" class="clearfix">
                  <span>问诊日期：{{ item.visitDate }}</span>
                  <span>就诊医师：{{ item.doctorName }}</span>
                  <span>病症：{{ item.symptom }}</span>
                </div>
                <div>
                  <el-descriptions>
                    <el-descriptions-item label="患者主诉">{{ item.chiefComplaint }}</el-descriptions-item>
                    <el-descriptions-item label="医生医嘱">{{ item.diagnosis }}</el-descriptions-item>
                  </el-descriptions>
                  <el-table :header-cell-style="{ 'text-align': 'center' }" border="" :data="item.disposals"
                     ref="DisposalDetail" show-summary>
                    <el-table-column prop="itemName" label="项目名称" align="center"> </el-table-column>
                    <el-table-column prop="itemType" label="类别" align="center"> </el-table-column>
                    <el-table-column prop="unit" label="单位" align="center"> </el-table-column>
                    <el-table-column prop="count" label="数量" align="center"> </el-table-column>
                    <el-table-column prop="price" label="项目价格" align="center"> </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-main>
            <el-footer>Footer</el-footer>
          </el-container>

        </el-drawer>

      </el-tab-pane>
      <el-tab-pane label="今日患者">
        <div class="content">
          <div class="content-left">
            <el-menu default-active="1" class="el-menu-vertical-demo" style="background-color: #ffffff;">
              <el-menu-item index="1">预约未到</el-menu-item>
              <el-menu-item index="2">待分诊</el-menu-item>
              <el-menu-item index="2">治疗中</el-menu-item>
              <el-menu-item index="2">待缴费</el-menu-item>
              <el-menu-item index="2">已完成</el-menu-item>
            </el-menu>
          </div>
          <div class="content-right">
            <el-descriptions title="用户信息">
              <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
              <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
              <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
              <el-descriptions-item label="备注">
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的工作台">
        <div class="content">
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { regionDataPlus } from 'element-china-area-data';
import provinceAndCity from '@/assets/js/province';
export default {
  data() {
    return {
      drawer: false,
      isChecked: false,
      title: 'Card Title',
      content: 'This is the card content.',
      selectedOptions: [],
      options: regionDataPlus,
      provinceAndCity,
      search: { current: 1, size: 6 },
       queryForm: {
        page: 1,
        row: 10,
        patientname: '',
        phoneNumber: '',
      },
      patientHistory: [],
      currentRow: null,
      table: {
        userList: [],
        patienList: [],
        disposals:[],
        total: 0,
      },
      dialogObject: {
        updateVisible: false,
        addVisible: false,
        patientRegistration: false,
      },
      patientRegistrationForm: {},
      patientForm: {
        patientId: '',
        patientName: '',
        sex: 0,
        age: 0,
        address: '',
        phoneNumber: '',
        areadata: '',
        source: '',
      },
      sourceList: [{ key: 0, value: '请选择患者来源' }, { key: 1, value: '网络咨询' }, { key: 2, value: '朋友介绍' }, { key: 3, value: '家住附近' }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    };
  },
  computed: {
    tableRowClassName() {
      return (row, index) => {
        if (this.currentRow && row.row === this.currentRow) {
          console.log("asd");
          return 'table-row-selected'
        }
        return ''
      }
    }
  },
  methods: {
    loadData() {
      this.GetPatienInfo();
    },

    //获取患者数据
    async GetPatienInfo() {
      const patientForm = {
        Page: this.queryForm.page,
        Row: this.queryForm.row,
        PhoneNumber: this.queryForm.phoneNumber,
        Patientname: this.queryForm.patientname
      }
      await this.$api.patient.GetPatienInfo(patientForm).then((res) => {
        const { returnData, success, message } = res.data;
        console.log(res.data);
        if (!success) {
          return;
        }

        this.table.patienList = returnData;
        this.table.total = res.data.count;
      });
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
    //获取是医生的员工信息
    async GetUserByRole() {
      await this.$api.employee.GetUserByRole().then((res) => {
        const { returnData, success, message } = res.data;
        console.log(res.data);
        if (!success) {
          return;
        }
        this.table.userList = returnData;
      });
    },
    //创建患者病历
    async CreatePatientVisit() {
      const createPatientVisitForm = {
        VisitDoctorId: this.currentRow.userId,
        patientId: this.patientRegistrationForm.patientid
      }
      await this.$api.patient.CreatePatientVisit(createPatientVisitForm).then((res) => {
        const { returnData, success, message } = res.data;
        console.log(res.data);
        if (!success) {
          return;
        }
        this.$alert('已患者分诊，请医生到自己的工作台查看', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });

      });
    },

    //查看患者历史病历
    CheckPatienHistory(row) {
      this.$api.patient.GetPatientVisitCompletedList(row.patientid).then((res) => {
        const { returnData, success, message } = res.data;
        console.log(res.data);
        if (!success) {
          return;
        }
        this.patientHistory = returnData;
        // this.table.disposals=returnData.disposals;
      });
      this.drawer = true;
    },

    handleClick(row) {
      console.log(row);
    },

    //重置搜索条件
    Refresh() {
      this.queryForm.conditions = '';
      this.queryForm.departmentId = '';
      this.loadData();
    },

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
    PatientRegistration(row) {
      this.patientRegistrationForm = {},
        this.GetUserByRole();
      this.patientRegistrationForm = row,
        console.log(this.patientRegistrationForm);
      this.dialogObject.patientRegistration = true;
    },
    //地址框选择触发
    handleChange(value) {
      this.search.province = '';
      this.search.city = '';
      this.search.district = '';
      for (var k = 0, lengthk = provinceAndCity.length; k < lengthk; k++) {
        //确定省
        if (provinceAndCity[k].code == value[0]) {
          this.search.province = provinceAndCity[k].name;
          if (provinceAndCity[k].cityList && value.length >= 2 && value[1] != '') {
            for (var i = 0, lengthi = provinceAndCity[k].cityList.length; i < lengthi; i++) {
              //确定市
              if (provinceAndCity[k].cityList[i].code == value[1] || provinceAndCity[k].cityList.length == 1) {
                this.search.city = provinceAndCity[k].cityList[i].name;
                //确定区
                if (provinceAndCity[k].cityList[i].areaList && value.length == 3 && value[2] != '') {
                  for (var j = 0, lengthj = provinceAndCity[k].cityList[i].areaList.length; j < lengthj; j++) {
                    if (provinceAndCity[k].cityList[i].areaList[j].code == value[2]) {
                      this.search.district = provinceAndCity[k].cityList[i].areaList[j].name;
                      break;
                    }
                  }
                }
                break;
              }
            }
          }
          break;
        }
      }
      this.patientForm.areadata = '';
      this.patientForm.areadata = this.search.province + this.search.city + this.search.district;
    },
    openAddDialog() {
      // this.patientForm = null,
      this.dialogObject.addVisible = true;
    },
    handleCardClick() {
      // 处理卡片的点击事件
    },
    handleRowClick(row) {
      this.currentRow = {};
      this.currentRow = row
    },
  },

  created() {
    this.loadData();
  },
};
</script>

<style lang="less" scoped>
.patientInfo_container {
  width: auto;
  height: auto;

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


    .clearfix span {
      margin-left: 60px;
    }
  }

  .editform {
    width: 40%;
    overflow: hidden;
  }

  .selectInput {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 0.3fr 0.3fr;
    grid-column-gap: 3px;
  }

  .content-left {
    width: 100px;
    float: left;
    height: 100%;
  }

  .content-right {
    width: auto;
    float: right;
  }


  .card-checkbox {
    position: absolute;
    top: 5px;
    right: 5px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }

  :deep .box-card {
    margin-top: 40px;
  }

  :deep .clearfix>span {
    margin-right: 60px;
  }

}
</style>

<style>
.table-row-selected {
  background-color: #80cfe3 !important;
}
</style>
