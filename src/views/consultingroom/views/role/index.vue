<template>
    <div class="role_container">
      <!-- 操作 -->
      <div class="editbar">
        <div class="edit_btn">
          <el-button plain type="primary" size="mini" class="el-icon-folder-add" @click="openCreateDialog()">添加角色 </el-button>
          <el-button  plain type="danger" size="mini" class="el-icon-delete" @click="deleteRoleIdById()">
            删除角色
          </el-button>
          <!-- <el-upload class="upload" action="" :http-request="importRolesByExcel" :auto-upload="true" :limit="1" :show-file-list="false">
            <el-button slot="trigger" size="mini" type="success">
              导入数据
            </el-button>
          </el-upload>
          <el-button slot="trigger" size="mini" type="warning" @click="exportRoleDataToExcel()">
            导出数据
          </el-button> -->
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="table.roleList" :header-cell-style="{ 'text-align': 'center' }" @selection-change="selectRows" border="">
        <el-table-column type="selection" width="50" align="center"> </el-table-column>
        <el-table-column prop="roleId" fixed label="角色编号" width="180" align="center"> </el-table-column>
        <el-table-column prop="name" label="角色名" width="150" align="center"></el-table-column>
        <el-table-column prop="descripcion" label="角色描述" align="center"></el-table-column>
        <el-table-column prop="id" label="层级顺序" width="150" align="center"></el-table-column>

        <!-- 操作 -->
        <el-table-column fixed="right" label="编辑" width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="openAllocationDiolog(scope.row)" icon="el-icon-edit">分配权限</el-button> -->
            <el-button type="text" size="small" @click="updateDiolog(scope.row)" icon="el-icon-edit">编辑内容</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 修改角色信息对话框 -->
      <el-dialog title="角色信息" center :visible.sync="dialogObject.updateVisible" :close-on-click-modal="false" width="40%">
        <el-form ref="updateform" :model="roleForm" label-width="80px">
          <el-form-item label="角色Id">
            <el-input v-model="roleForm.roleId" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" :rows="6" v-model="roleForm.descripcion" hidden="50px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogObject.updateVisible = false">取 消</el-button>
          <el-button type="success" @click="updateRole()">修 改</el-button>
        </div>
      </el-dialog>
  
      <!-- 添加角色信息对话框 -->
      <el-dialog title="角色信息" center :visible.sync="dialogObject.createVisible" :close-on-click-modal="false" width="40%">
        <el-form ref="createform" :model="roleForm" label-width="80px">
          <el-form-item label="角色Id">
            <el-input v-model="roleForm.roleId"></el-input>
          </el-form-item>
          <el-form-item label="角色名称">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input type="textarea" :rows="6" v-model="roleForm.descripcion" hidden="50px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogObject.createVisible = false">取 消</el-button>
          <el-button type="success" @click="addRole()">添加</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        roleForm: {
          roleId: '',
          name: '',
          descripcion: '',
          id:0,
        },
        table: {
          roleList: [],
          total: 0,
        },
        dialogObject: {
          updateVisible: false,
          createVisible: false,
          allocationDiolog: false,
        },
        roleIds: [],
      
      };
    },
    computed: {
      roleList() {
        return this.roleForm.roleNames.split('、');
      },
    },
    methods: {
      //导入数据
      importRolesByExcel(param) {
        if (param.file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.$notify.warning({
            title: '警告',
            message: '请上传格式为.xlsx 的文件',
          });
        } else {
          const formdata = new FormData();
          formdata.append('file', param.file);
          formdata.append('tableId', 'Role');
          this.$api.role.importRolesByExcel(formdata).then((res) => {
            const { data, success, message } = res.data;
            if (!success) {
              this.$message({ message: message, type: 'error' });
            } else {
              this.$message({ message: message, type: 'success' });
              this.loadData();
            }
          });
        }
      },

      loadData() {
        this.getRoleList();
      },
      //获取角色数据
      async getRoleList() {
        await this.$api.role.GetRolesList().then((res) => {
          const { returnData, success, message } = res.data;
          if (!success) {
            console.log(message);
            return;
          }
          this.table.roleList = returnData;
        });
      },
      //打开添加弹窗弹窗
      openCreateDialog() {
        this.dialogObject.createVisible = true; //打开添加弹窗
        this.roleForm.roleId = '';
        this.roleForm.name = '';
        this.roleForm.descripcion = '';
      },
      //添加角色数据
      addRole() {
        this.$api.role.AddRole(this.roleForm).then((res) => {
          const { data, success, message } = res.data;
          if (!success) {
            this.$message({ message: '添加失败！', type: 'error' });
          } else {
            this.$message({ message: '添加成功！', type: 'success' });
            this.dialogObject.createVisible = false;
            this.loadData();
          }
        });
      },
      //打开修改弹窗
      updateDiolog(row) {
        this.roleForm.roleId = row.roleId;
        this.roleForm.name = row.name;
        this.roleForm.descripcion = row.descripcion;
        this.dialogObject.updateVisible = true;
      },
      //修改角色数据
      updateRole() {
        const role = {
          roleId: this.roleForm.roleId,
          descripcion: this.roleForm.descripcion,
          name: this.roleForm.name,
        };
        this.$api.role.updateRole(role).then((res) => {
          const { data, success, message } = res.data;
          if (!success) {
            this.$message({ message: '修改失败！', type: 'error' });
          } else {
            this.$message({ message: '修改成功！', type: 'success' });
            this.dialogObject.updateVisible = false;
            this.loadData();
          }
        });
      },
      //获取选中行的数据
      selectRows(selection) {
        console.log(selection);
        this.roleIds = [];
        selection.forEach((element) => {
          this.roleIds.push(element.roleId);
        });
        console.log(this.roleIds);
      },
      //删除角色
      deleteRoleIdById() {
        if (this.roleIds.length == 0) {
          this.$message({
            message: '请选择要删除的数据',
            type: 'warning',
          });
        } else {
          this.$api.role.DeleteRoleList(this.roleIds).then((res) => {
            let { success, message } = res.data;
            if (!success) {
              console.log(message);
              this.$message.error('删除失败！');
            } else {
              this.$message({ message: '删除成功！', type: 'success' });
              this.loadData();
            }
          });
        }
      },
      openAllocationDiolog(row) {
        this.dialogObject.allocationDiolog = true;
        //在弹出dialogDOM元素未加载完成之前执行$nextTick回调函数，确保el-tree已经渲染
        // this.$nextTick(() => {
        //   this.$refs.routerTree.setCheckedKeys([]);
        // });
        this.roleForm.roleId = row.roleId;
        this.$api.role.getAllPermissionsByRoleId(row['roleId']).then((res) => {
          this.$refs.routerTree.setCheckedKeys([]);
  
          const { data, success, message } = res.data;
          debugger;
          //清空选中节点
          if (success) {
            //设置默认选中节点
            this.defaultCheckedKeys = data;
          }
        });
      },
      //节点选中状态发生变化时的回调
      handleCheckChange(data, checked, indeterminate) {
        //获取所有选中的节点 getCheckedNodes()
        // 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
        let res = this.$refs.routerTree.getCheckedNodes(false, true); //子节点+父节点
        this.routerIds = ['index'];
        res.forEach((item) => {
          this.routerIds.push(item.id);
        });
      },
      //分配权限
      assignPermissions() {
        //未选中数组，且角色为分配任何权限
        if (this.routerIds.length == 0 && this.defaultCheckedKeys.length == 0) {
          this.$message({ message: ' 未选中数据', type: 'warning' });
          return false;
        } else if (this.routerIds.toString() == this.defaultCheckedKeys.toString()) {
          this.$message({ message: ' 未修改数据', type: 'warning' });
          return false;
        }
        this.$api.role.assignPermissions(this.roleForm.roleId, this.routerIds).then((res) => {
          const { data, success, message } = res.data;
          if (!success) {
            this.$message({ message: '分配失败！', type: 'error' });
          } else {
            this.$message({ message: '分配成功！', type: 'success' });
            this.dialogObject.allocationDiolog = false;
            this.$refs.routerTree.setCheckedKeys([]);
          }
        });
      },
    },
    created() {
      this.loadData();
      this.constructRouteTreeData();
    },
  };
  </script>
  
  <style lang="less" scoped>
  .role_container {
    width: 100%;
    height: 100%;
    .editbar {
      width: 100%;
      margin: 5px 0px;
      padding: 2px 0px;
      display: grid;
      grid-template-columns: 2fr 1.1fr;
      .edit_btn {
        display: flex;
        flex-direction: row;
        grid-gap: 5px;
      }
    }
  }
  </style>
  