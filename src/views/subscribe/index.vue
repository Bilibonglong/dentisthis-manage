
<template>
  <div class="subscribe">

    <div class="editbar">
      <div class="edit_btn">
        <div class="block">
          <span>预约时间:</span>
          <el-date-picker v-model="endDate" type="daterange" align="right" unlink-panels range-separator="至"
            start-placeholder="起始时间" end-placeholder="终止时间" :picker-options="pickerOptions" size="mini"
            style="width: 300px;">
          </el-date-picker>
        </div>
        <div>
          <el-select style="margin-left: 20px;" placeholder="请选择预约状态" size="mini" v-model="queryForm.reservationState">
            <el-option v-for="item in reservationStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select placeholder="请选择预约医生" size="mini" style="margin-left: 20px;" v-model="queryForm.doctorId">
            <el-option v-for="item in doctorList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="edit_query">
        <el-button type="success" @click="openAddSubscribe()" size="mini ">新增预约</el-button>
        <el-button type="primary" @click="GetRreservationList()" size="mini ">查找</el-button>
        <el-button type="primary" @click="Refresh()" size="mini ">重置</el-button>
      </div>
    </div>
    <el-table :data="this.table.subscribeList" border style="width: 100%" :height="400">
      <el-table-column prop="patientName" label="患者姓名">
      </el-table-column>
      <el-table-column prop="reservationstateStr" label="状态">
      </el-table-column>
      <el-table-column prop="patientId" label="病历号">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex == 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄">
        <template slot-scope="scope">
          {{ scope.row.age + "岁" }}
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期">
      </el-table-column>
      <el-table-column prop="reservationDate" label="预约日期">
      </el-table-column>
      <el-table-column prop="doctorName" label="预约医师">
      </el-table-column>
      <el-table-column prop="healItemStr" label="预约事项">
      </el-table-column>
      <el-table-column prop="doctorName" label="预约人">
      </el-table-column>
      <el-table-column prop="doctorName" label="预约备注">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号">
      </el-table-column>

      <el-table-column prop="sourceStr" label="患者来源">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="145px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.reservationstateStr==='新建挂号'" @click="CreatePatientVisit(scope.row)" type="text" size="small">到达分诊</el-button>
          <el-button v-if="scope.row.reservationstateStr==='新建挂号'"  @click="AddDisposal(scope.row)" type="text" size="small">修改信息</el-button>
          <el-tag v-if="scope.row.reservationstateStr!=='新建挂号'" type="info">患者已到达就诊,不可操作</el-tag>
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


    <el-dialog id="AddSubscribe" title="预约信息" center :visible.sync="dialogObject.AddSubscribe"
      :close-on-click-modal="false" :fullscreen="true">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="always" high="500px">
            <div slot="header" class="clearfix">
              <span>预约信息</span>
            </div>
            <div>
              <el-form ref="sumbscribePatientForm" label-width="80px" :model="subscribeForm" rules="rules">
                <el-form-item label="患者编号" prop="userId">
                  <el-input disabled placeholder="系统自动生成" v-model="subscribeForm.patientId"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                  <el-select v-model="subscribeForm.patientName" placeholder="" filterable remote reserve-keyword
                    :remote-method="remoteMethod" :loading="loading" @change="bindOptionToform">
                    <el-option v-for="item in options" :key="item.patientname" :label="item.patientname"
                      :value="item.patientname"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="手机" prop="phone">
                  <el-input type="text" v-model="subscribeForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group size="mini" v-model="subscribeForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="患者来源">
                  <el-select v-model="subscribeForm.source">
                    <el-option v-for="item in patientSourceType" :label="item.label" :value="item.value"
                      :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="预约医生">
                  <el-select v-model="subscribeForm.subscribeDoctor">
                    <el-option v-for="item in doctorList" :label="item.label" :value="item.value"
                      :key="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card shadow="hover">
            <div slot="header" class="clearfix">
              <span>预约时段</span>
            </div>
            <div class='demo-app'>
              <div class='demo-app-main'>
                <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
                </FullCalendar>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>预约项目</span>
            </div>
            <div style="margin-top: 20px">
              <el-checkbox-group v-model="checkboxItem" size="mini">
                <el-checkbox v-for="item in healItem" :key="item.label" border :label="item.label" :value="item.value"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObject.AddSubscribe = false">取 消</el-button>
        <el-button type="primary" @click="AddSubscribe()">新建预约</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from '@/utils/event-utils'
export default {

  components: {
    FullCalendar // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      reservationStatus: [{ label: "已预约", value: 1 }, { label: "已到达", value: 2 }, { label: "治疗中", value: 3 }, { label: "已结算", value: 4 },],
      patientSourceType: [{ label: "网络咨询", value: 1 }, { label: "朋友介绍", value: 2 }, { label: "家住附近", value: 3 }],
      doctorList: [],
      subscribeForm: {
        patientName: '',
        patientId: '',
        sex: 0,
        age: 0,
        phoneNumber: '',
        source: '',
        subscribeDoctor: '',
        startStr: '',
        subscribeType: '',
        endStr: ''
      },
      queryForm: {
        page: 1,
        row: 10,
        doctorId: '',
        reservationState: '',
      },
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        allDayDefault: false,
        allDaySlot: false,
        minTime: 7,
        firstDay: 1, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推
        timeGridEventMinHeight: '20', // 设置事件的最小高度
        aspectRatio: 3,//设置日历单元格宽度与高度的比例。
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日'
        },
        height: 450,
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: true,
          hour12: false // 设置时间为24小时
        },
        eventColor: '#3BB2E3',
        //日历头部按钮位置
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          // right: 'dayGridMonth,timeGridWeek,timeGridDay'
          right: 'timeGridWeek,timeGridDay'
        },

        views: {
          timeGridDay: {
            slotMinTime: "09:00",//周视图开始时间
            slotMaxTime: "18:00",//周视图结束时间
            displayEventTime: false,//是否显示时间
          },
        },
        locale: 'zh-cn',
        initialView: 'timeGridDay',// 默认为那个视图（月：dayGridMonth，周：timeGridWeek，日：timeGridDay）
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      table: {
        subscribeList: [],
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      inputDate: '',
      endDate: '',
      dialogObject: {
        AddSubscribe: false
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      checkboxItem: [],
      healItem: [],
      options: [],
    }
  },

  methods: {
    loadData() {
      this.GetRreservationList();
      this.GetUserByRole();
    },
    //获取医疗项目列表
    async GetHealItemInfo() {
      await this.$api.healItem.GetHealItemInfo().then((res) => {
        const { returnData, success, message } = res.data;
        if (!success) {
          return;
        }
        this.healItem = returnData.map(x => ({ label: x.itemName, value: x.itemId }));
      });
    },
    tiemHelper(date) {
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let M = date.getMinutes()
      M = M < 10 ? ('0' + M) : M
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      let dateTime = y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s;
      return dateTime
    },
    //获取是医生的员工信息
    async GetUserByRole() {
      await this.$api.employee.GetUserByRole().then((res) => {
        const { returnData, success, message } = res.data;
        if (!success) {
          return;
        }
        this.doctorList = returnData.map(x => ({ label: x.userName, value: x.userId }));
      });
    },
    //预约分诊
    async CreatePatientVisit(row) {
      console.log(row);
      const createPatientVisitForm = {
        DoctorId: row.doctorId,
        PatientId: row.patientId,
        ReservationId:row.reservationId
      }
      await this.$api.reservation.RreservationTriage(createPatientVisitForm).then((res) => {
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
    ///获取预约列表
    async GetRreservationList() {
      // console.log(tiemHelper(this.endDate));
      const RreservationForm = {
        page: this.queryForm.page,
        row: this.queryForm.row,
        doctorId: this.queryForm.doctorId,
        reservationState: this.queryForm.reservationState==''?0:this.queryForm.reservationState,
        reservationInputDate: this.endDate[0],//this.tiemHelper(this.endDate[0]),
        reservationEndDate: this.endDate[1]
      }
      console.log(RreservationForm);
      await this.$api.reservation.GetRreservationList(RreservationForm).then((res) => {
        const { returnData, success, message } = res.data;
        if (!success) {
          return;
        }
        this.table.subscribeList = returnData;
      });
    },

    bindOptionToform() {
      this.subscribeForm.phoneNumber = this.options.filter(x => x.patientname == this.subscribeForm.patientName)[0].phonenumber;
      this.subscribeForm.sex = this.options.filter(x => x.patientname == this.subscribeForm.patientName)[0].sex;
      this.subscribeForm.source = this.options.filter(x => x.patientname == this.subscribeForm.patientName)[0].source;
      this.subscribeForm.patientId = this.options.filter(x => x.patientname == this.subscribeForm.patientName)[0].patientid;

    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          //获取患者数据
          this.$api.patient.GetPatienInfo({ patientName: query }).then((res) => {
            const { returnData, success, message } = res.data;
            if (!success) {
              return;
            }
            this.options = returnData;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    async AddSubscribe() {
      const subscribeForm = {
        Patientid: this.subscribeForm.patientId,
        Patientname: this.subscribeForm.patientName,
        Healitems: this.checkboxItem,
        ReservationInputDate: this.tiemHelper(this.subscribeForm.startStr),
        ReservationEndDate: this.tiemHelper(this.subscribeForm.endStr),
        Doctorid: this.subscribeForm.subscribeDoctor
      }

      await this.$api.reservation.AddReservation(subscribeForm).then((res) => {
        const { returnData, success, message } = res.data;
        if (!success) {
          return;
        } else {
          this.$message(message);
        }
      });
    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    openAddSubscribe() {
      this.GetHealItemInfo();
      this.GetUserByRole();
      this.dialogObject.AddSubscribe = true
    },
    handleDateSelect(selectInfo) {
      // let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
      let title = this.subscribeForm.patientName

      this.subscribeForm.startStr = selectInfo.start;
      this.subscribeForm.endStr = selectInfo.end;
      calendarApi.unselect() // clear date selection

      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      })

    },

    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },

    handleEvents(events) {
      this.currentEvents = events
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
  },
  created() {
    this.loadData();
  },
}
</script>

<style lang="less" scoped>
.subscribe {
  width: 100%;
  height: 100%;

  .editbar {
    width: 100%;
    margin: 5px 0px;
    padding: 2px 0px;
    display: grid;
    grid-template-columns: 3fr 1fr;

    .edit_btn {
      display: flex;
      flex-direction: row;
    }

    .edit_query {
      width: 100%;
      // display: grid;
      // grid-template-columns: 2fr 2fr 0.3fr 0.3fr;
      // grid-column-gap: 5px;
    }
  }

  .editform {
    width: 40%;
    overflow: hidden;
  }

  .box-card {
    width: 600px;
  }
}
</style>

<!-- <style lang='less'>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 660px;
  margin: 0 auto;
}
</style> 
