<template>
  <div class="patientInfo_container">

    <div class="editbar">
      <div class="edit_btn">
        <el-button type="success" size="mini" class="el-icon-edit" @click="openAddDialog()">新增患者</el-button>
        <!-- <el-button type="primary" size="mini" >引入销售单</el-button>
        <el-button type="warning" size="mini" > 提交 </el-button> -->
      </div>
      <div class="edit_query">
        <el-select size="mini">
          <!-- <el-option v-for="item in warehouseList" :key="item.warehouseId" :label="item.warehouseName" :value="item.warehouseId"></el-option> -->
        </el-select>
        <el-input size="mini" label-width="80px" placeholder="姓名/手机号/病历号"></el-input>
        <el-button type="primary" @click="getPurchasePlanList()" size="mini">查找</el-button>
        <el-button type="primary" @click="resetQueryForm()" size="mini">重置</el-button>
      </div>
    </div>


        <el-table :data="tableData" border style="width: 100%" :height="500">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="date" label="患者姓名" >
          </el-table-column>
          <el-table-column prop="name" label="病历号" >
          </el-table-column>
          <el-table-column prop="province" label="手机号">
          </el-table-column>
          <el-table-column prop="city" label="年龄" >
          </el-table-column>
          <el-table-column prop="address" label="性别" >
          </el-table-column>
          <el-table-column prop="zip" label="患者标签" >
          </el-table-column>
          <el-table-column prop="zip" label="初诊医生" >
          </el-table-column>
          <el-table-column prop="zip" label="复诊医生" >
          </el-table-column>
          <el-table-column prop="zip" label="复诊日期" >
          </el-table-column>
          <el-table-column prop="zip" label="创建日期" >
          </el-table-column>
          <el-table-column prop="zip" label="患者来源" >
          </el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
            <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="table.total"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="queryForm.page"
        :page-size="queryForm.row"
        layout="total, sizes, prev, pager, next, jumper"
        background
      >
      </el-pagination>
    </div>
    <!-- <RouterView></RouterView> -->

    <el-dialog title="患者" center :visible.sync="dialogObject.addVisible" :close-on-click-modal="false" width="50%">
      <el-form :model="patientForm" :rules="rules" ref="userForm" label-width="80px">
        <el-form-item label="患者Id" prop="userId">
          <el-input v-model="patientForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="patientForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="patientForm.sex" size="mini">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="患者来源">
          <el-select v-model="patientForm.Source" filterable>
            <el-option v-for="item in sourceList" :label="item.value" :value="item.key" :key="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input type="text" v-model="patientForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="省区">
          <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange"> </el-cascader>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="text" v-model="patientForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogObject.addVisible = false">取 消</el-button>
        <el-button type="success" @click="addPatient()">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {
        page: 1,
        row: 10,
        conditions: '',
        roleId: '',
      },
      table: {
        userList: [],
        total: 0,
      },
      dialogObject: {
        updateVisible: false,
        addVisible: false,
      },
      patientForm: {
        patientId:'',
        patientName:'',
        sex:0,
        age:0,
        address:'',
        phoneNumber:'',
      },
      sourceList:[{key:0,value:'请选择患者来源'},{key:1,value:'网络咨询'},{key:2,value:'朋友介绍'},{key:3,value:'家住附近'}]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },

    openAddDialog()
    {
      this.patientForm=null,
      this.dialogObject.addVisible=true;
    }
  },
  created() {},
};
</script>

<style lang="less">
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
}
</style>