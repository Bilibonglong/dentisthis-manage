<template>
  <div class="skuList_container">
    <!-- 操作 -->
    <div class="editbar">
      <div class="edit_btn">
        <el-button plain type="danger" size="mini" class="el-icon-delete" @click="deleteSkuFromWarehouse()">移除</el-button>
      </div>
      <div class="edit_query">
        <el-select size="mini" v-model.number="queryForm.paymentType" placeholder="请选择类别">
          <el-option v-for="item in paySource" :key="item.label" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-input v-model="queryForm.conditions" size="mini" label-width="80px" placeholder="收费人/门诊号"></el-input>
        <el-button type="primary" @click="GetRevenueOrderList()" size="mini">查找</el-button>
        <el-button type="primary" @click="resetQueryForm()" size="mini">重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="table.financeList" @selection-change="selectWarehouseSkuRows" highlight-current-row border
      row-style="height:40px">
      <el-table-column type="selection" width="45" align="center"> </el-table-column>
      <el-table-column label="收费流水号" prop="billNumber" align="center">
      </el-table-column>
      <el-table-column label="来源门诊号" prop="sourceNumber" align="center">
      </el-table-column>
      <el-table-column label="总诊金" prop="income" align="center">
      </el-table-column>
      <el-table-column label="收费时间" prop="createTime" align="center">
      </el-table-column>
      <el-table-column label="收费人" prop="operatorEmpName" align="center">
      </el-table-column>
      <el-table-column label="收费类型" prop="paymentTypeStr" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="编辑" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateDiolog(scope.row)" icon="el-icon-check">查看详情</el-button>
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
        paymentType: "",
      },
      table: {
        financeList: [],
        total: 0,
      },
      dialogObject: {
        addVisible: false,
      },
      paySource: [
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
      ]
    };
  },
  methods: {
    loadData() {
      this.GetRevenueOrderList();
    },

    //获取营收单
    async GetRevenueOrderList() {
      const data = {
        page: this.queryForm.page,
        row: this.queryForm.row,
        conditions: this.queryForm.conditions,
        paymentType: this.queryForm.paymentType == '' ? 0 : this.changePayType(this.queryForm.paymentType),
      }
      await this.$api.finance.GetRevenueOrderList(data).then((res) => {
        const { returnData, success, message,count } = res.data;
        if (!success) {
          return;
        }
        this.table.financeList = returnData;
        this.table.total=count;
      });
    },

    //查找物品
    //重置搜索条件
    resetQueryForm() {
      this.queryForm.conditions = '';
      this.queryForm.goodsTypeId = '';
      this.loadData();
    },
    resetDialogQueryForm() {
      this.skuForm.spuId = '';
      this.skuForm.skuId = '';
      this.skuForm.goodsName = '';
      this.skuForm.goodsTypeId = 0;
      this.getSKUListBySupplierId();
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
    handleDialogSizeChange(row) {
      this.skuForm.row = row;
      this.getSKUListBySupplierId();
    },
    //对话框页数改变
    handleDialogCurrentChange(page) {
      this.skuForm.page = page;
      this.getSKUListBySupplierId();
    },
    //获取选中行的数据
    selectSupplierSkuRows(selection) {
      this.supplierIdSkuIds = [];
      selection.forEach((element) => {
      });
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
    //打开添加弹窗
    openAddDialog() {
      this.dialogObject.addVisible = true;
      this.getSKUListBySupplierId();
    },
    //修改信息
    updateWarehouseSku(row) {
      this.$api.warehouse.updateWarehouseSku(row).then((res) => {
        const { data, success, message } = res.data;
        if (!success) {
          this.$message({ message: '修改失败！', type: 'error' });
        } else {
          this.$message({ message: '修改成功！', type: 'success' });
          this.dialogObject.addVisible = false;
          this.loadData();
        }
      });
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
      grid-template-columns: 2fr 2fr 1fr 1fr 0.5fr;
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
  