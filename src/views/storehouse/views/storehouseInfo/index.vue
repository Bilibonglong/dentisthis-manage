<template>
    <div class="skuList_container">
        <!-- 操作 -->
        <div class="editbar">
            <div class="edit_btn">
                <el-button plain type="primary" size="mini" class="el-icon-folder-add" @click="openAddDialog()">手动入库
                </el-button>
                <el-button plain type="danger" size="mini" class="el-icon-delete"
                    @click="DeleteStorehouses()">移除</el-button>
            </div>
            <div class="edit_query">
                <el-select size="mini" v-model="queryForm.goodsType" placeholder="请选择物品类型">
                    <el-option v-for="item in goodsType" :key="item.value" :label="item.label" :value="item.value">
                        <!-- <span style="float: left">{{ item.label }}</span> -->
                    </el-option>
                </el-select>
                <el-input v-model="queryForm.conditions" size="mini" label-width="80px" placeholder="请输入物品名称/编号"></el-input>
                <el-button type="primary" @click="GetStorehousesList()" size="mini">查找</el-button>
                <el-button type="primary" @click="resetQueryForm()" size="mini">重置</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="table.storehouses" @selection-change="selectStorehousesows" highlight-current-row border>
            <el-table-column type="selection" width="45" align="center"> </el-table-column>
            <el-table-column label="物品编号" prop="itemId" align="center">
            </el-table-column>
            <el-table-column label="物品名称" prop="itemName" align="center">
            </el-table-column>
            <el-table-column label="物品类型" prop="itemTypeStr" align="center">
            </el-table-column>
            <el-table-column label="物品库存" prop="itemCount" align="center">
                <template slot-scope="scope">
                    <el-input type="number" size="mini" v-model.number="scope.row.itemCount"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="物品警告库存" prop="warnCount" align="center">
                <template slot-scope="scope">
                    <el-input type="number" size="mini" v-model.number="scope.row.warnCount"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="编辑" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateItem(scope.row)" icon="el-icon-check">保存信息</el-button>
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

        <!--添加货品信息-->
        <el-dialog title="添加货品" center :visible.sync="dialogObject.addVisible" :close-on-click-modal="false" width="50%">
            <el-form :model="addStorehouse" ref="addStorehouse" label-width="80px">
                <el-form-item label="物品编号" prop="userId">
                    <el-input v-model="addStorehouse.ItemId" placeholder="N"></el-input>
                </el-form-item>
                <el-form-item label="物品名称" prop="name">
                    <el-input v-model="addStorehouse.ItemName"></el-input>
                </el-form-item>
                <el-form-item label="物品类型" prop="name">
                    <el-select size="mini" v-model="addStorehouse.ItemType" placeholder="请选择物品类型">
                        <el-option v-for="item in goodsType" :key="item.value" :label="item.label" :value="item.value">
                            <!-- <span style="float: left">{{ item.label }}</span> -->
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物品库存" prop="name">
                    <el-input-number v-model="addStorehouse.ItemCount"></el-input-number>
                </el-form-item>
                <el-form-item label="警告库存" prop="name">
                    <el-input-number v-model="addStorehouse.WarnCount"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="AddStorehouses()">手动物品入库</el-button>
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
                conditions: '',
                goodsType: '',
            },
            goodsType: [
                {
                    value: '药品',
                    label: '药品'
                }, {
                    value: '耗材',
                    label: '耗材'
                }
            ],
            table: {
                storehouses: [],
                total: 0,
            },
            dialogObject: {
                addVisible: false,
            },
            addStorehouse: {
                ItemType: '',
                ItemId: '',
                ItemName: '',
                ItemCount: '',
                WarnCount: '',
            },
            ItemIds: [],

        };
    },
    methods: {
        loadData() {
            this.GetStorehousesList();
        },

        //获取医疗项目列表
        async GetStorehousesList() {

            await this.$api.storehouse.GetStorehousesList({
                Page: this.queryForm.page,
                Row: this.queryForm.row,
                Conditions: this.queryForm.conditions,
                ItemType: this.queryForm.goodsType == '' ? 0 : this.changeGoodsType(this.queryForm.goodsType),
            }).then((res) => {
                const { returnData, success, message, count } = res.data;
                if (!success) {
                    return;
                }
                this.table.storehouses = returnData;
                this.table.total = count;
            });
        },
        //修改库存
        async updateItem(row) {
            await this.$api.storehouse.UpdateStorehouses(row).then((res) => {
                const { returnData, success, message, count } = res.data;
                if (!success) {
                    this.$message({ message: '修改失败！', type: 'error' });
                    return;
                }
                this.$message({ message: '修改成功！', type: 'success' });
                this.loadData();

            });
        },
        //移除库存
        async DeleteStorehouses() {

            if (this.ItemIds.length == 0) {
                this.$message({
                    message: '请选择要移除的数据',
                    type: 'warning',
                });
                return;
            }
            await this.$api.storehouse.DeleteStorehouses(this.ItemIds).then((res) => {
                const { returnData, success, message, count } = res.data;
                if (!success) {
                    this.$message({ message: '移除失败！', type: 'error' });
                    return;
                }
                this.$message({ message: '移除成功！', type: 'success' });
                this.loadData();

            });
        },
        //手动入库
        async AddStorehouses(row) {
            await this.$api.storehouse.AddStorehouses({

                ItemType: this.addStorehouse.ItemType == '' ? 0 : this.changeGoodsType(this.addStorehouse.ItemType),
                ItemId: this.addStorehouse.ItemId,
                ItemName: this.addStorehouse.ItemName,
                ItemCount: this.addStorehouse.ItemCount,
                WarnCount: this.addStorehouse.WarnCount,
            }
            ).then((res) => {
                const { returnData, success, message, count } = res.data;
                if (!success) {
                    this.$message({ message: '新增失败', type: 'error' });
                    return;
                }
                this.$message({ message: '新增成功', type: 'success' });
                this.dialogObject.addVisible = false;
                this.loadData();


            });
        },
        selectStorehousesows(selection) {
            this.ItemIds = [];
            selection.forEach((element) => {
                this.ItemIds.push(element.itemId);
            });
        },
        //重置搜索条件
        resetQueryForm() {
            this.queryForm.conditions = '';
            this.queryForm.goodsType = '';
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

        changeGoodsType(googsType) {
            if (googsType === "药品") {
                return 1;
            }
            if (googsType === "耗材") {
                return 2;
            }
        },

        //打开添加弹窗
        openAddDialog() {
            this.addStorehouse={},
            this.dialogObject.addVisible = true;
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
  