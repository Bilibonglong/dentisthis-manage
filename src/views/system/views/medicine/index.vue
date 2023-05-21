<template>
  <div class="skuList_container">
    <!-- 操作 -->
    <div class="editbar">
      <div class="edit_btn">
        <el-button plain type="primary" size="mini" class="el-icon-folder-add" @click="openAddDialog()">添加 </el-button>
        <el-button plain type="danger" size="mini" class="el-icon-delete" @click="deleteMedicines()">移除</el-button>
      </div>
      <div class="edit_query">
        <el-input v-model="queryForm.medicineName" size="mini" label-width="80px" placeholder="请输入"></el-input>
        <el-button type="primary" @click="GetMedicines()" size="mini">查找</el-button>
        <el-button type="primary" @click="resetQueryForm()" size="mini">重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="table.MedicineList" @selection-change="selectMedicinesRows" highlight-current-row border
      row-style="height:40px">
      <el-table-column type="selection" width="45" align="center"> </el-table-column>
      <el-table-column label="药品编号" prop="medicineId" align="center">
      </el-table-column>
      <el-table-column label="药品名称" prop="medicineName" align="center">
      </el-table-column>
      <el-table-column label="药品描述" prop="medicineDsc" align="center">
      </el-table-column>
      <el-table-column label="药品价格" prop="medicinePrice" align="center">
        <template slot-scope="scope">
          <el-input type="number" size="mini" v-model.number="scope.row.medicinePrice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="药品计价单位" prop="unit" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="编辑" width="200" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="openAllocationDiolog(scope.row)" icon="el-icon-edit">分配权限</el-button> -->
          <el-button type="text" size="small" @click="updateMedicine(scope.row)" icon="el-icon-check">保存数据</el-button>
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


    <!-- 新增药品模态框 -->
    <el-dialog title="药品" center :visible.sync="dialogObject.addVisible" :close-on-click-modal="false" width="50%">
      <el-form :model="addMedicineForm" ref="addMedicineForm" label-width="80px">
        <el-form-item label="药物编号" prop="userId">
          <el-input v-model="addMedicineForm.MedicineId" disabled placeholder="系统自动生成"></el-input>
        </el-form-item>
        <el-form-item label="药物名称" prop="name">
          <el-input v-model="addMedicineForm.MedicineName"></el-input>
        </el-form-item>
        <el-form-item label="药物描述" prop="name">
          <el-input v-model="addMedicineForm.MedicineDsc"></el-input>
        </el-form-item>
        <el-form-item label="药物价格" prop="name">
          <el-input-number v-model="addMedicineForm.MedicinePrice"></el-input-number>
        </el-form-item>
        <el-form-item label="单位" prop="name">
          <el-input v-model="addMedicineForm.Unit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="addMedicines()">新增药品</el-button>
        <!-- <el-button type="success" @click="dialogObject.addVisible = false">保存并到达</el-button>
            <el-button type="success" @click="addPatient()">保存并预约</el-button> -->
        <el-button @click="dialogObject.addVisible = false">取 消</el-button>
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
        medicineName: "",
      },
      table: {
        MedicineList: [],
        total: 0,
      },
      dialogObject: {
        addVisible: false,
      },
      addMedicineForm: {
        MedicineId: "",
        MedicineName: "",
        MedicineDsc: "",
        MedicinePrice: 0,
        Unit: "",
      },
      MedicineIds: [],
    };
  },
  methods: {
    loadData() {
      this.GetMedicines();
    },

    //获取药物列表
    async GetMedicines() {
      await this.$api.medicine.GetMedicines(this.queryForm).then((res) => {
        const { returnData, success, message, count } = res.data;
        if (!success) {
          return;
        }
        this.table.MedicineList = returnData;
        this.table.total = count;
      });
    },
    //修改药品单价
    async updateMedicine(row) {
      await this.$api.medicine.updateMedicine(row).then((res) => {
        const { returnData, success, message, count } = res.data;
        if (!success) {
          console.log(message)
          return;
        }
        this.$message({ message: '修改成功！', type: 'success' });
        this.loadData();
      });
    },
    //删除药品
    async deleteMedicines() {
      if (this.MedicineIds.length == 0) {
        this.$message({ message: '请选择药物', type: 'info' });
        return;
      }
      await this.$api.medicine.deleteMedicines(this.MedicineIds).then((res) => {
        const { returnData, success, message, count } = res.data;
        if (!success) {
          console.log(message)
          return;
        }
        this.$message({ message: '删除成功', type: 'success' });
        this.loadData();
      });
    },
    //新增药品
    async addMedicines() {
      await this.$api.medicine.AddMedicine(this.addMedicineForm).then((res) => {
        const { returnData, success, message, count } = res.data;
        if (!success) {
          console.log(message)
          return;
        }
        this.$message({ message: '新增成功', type: 'success' });
        this.loadData();
      });
    },
    selectMedicinesRows(selection) {
      this.MedicineIds = [];
      selection.forEach((element) => {
        this.MedicineIds.push(element.medicineId);
      });
    },
    //重置搜索条件
    resetQueryForm() {
      this.queryForm.medicineName = '';
      this.loadData();
    },
    //外层页面条数改变
    handleSizeChange(row) {
      this.queryForm.row = row;
      this.loadData();
    },
    //外层页数改变
    handleCurrentChange(page) {
      this.queryForm.page = page;
      this.loadData();
    },
    //对话框条数改变
    //打开添加弹窗
    openAddDialog() {
      this.dialogObject.addVisible = true;
      this.getSKUListBySupplierId();
    },
  },
  created() {
    this.loadData();

  },
};
</script>

<style lang="less" scoped>
.skuList_container {
  width: 100%;
  height: 100%;

  .el-table {

    // 看这里！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    // 深度选择器，去除默认的padding
    /deep/ th {
      padding: 1;
    }

    /deep/ td {
      padding: 0.5;
    }
  }

  .editbar {
    width: 100%;
    margin: 5px 0px;
    padding: 2px 0px;
    display: grid;
    grid-template-columns: 2fr 2fr;

    .edit_btn {
      display: flex;
      flex-direction: row;
    }

    .edit_query {
      width: 100%;
      display: grid;
      // border: 1px solid red;
      grid-template-columns: 1.5fr 0.5fr 0.5fr 0fr 0fr;
      grid-column-gap: 5px;
    }
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .selectInput {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 0.3fr 0.3fr;
    grid-column-gap: 3px;
  }
}
</style>
