<template>
    <div class="employee_container">
        <!-- 操作 -->
        <div class="editbar">
            <div class="edit_btn">
                <el-button plain type="primary " size="mini" class="el-icon-plus"
                    @click="openAddEmployeeDialog()">新增员工</el-button>
                <!-- <el-button plain type="danger" size="mini" class="el-icon-close" @click="UpdateUserState(true)">停用</el-button>
                <el-button plain type="warning" size="mini" class="el-icon-close" @click="UpdateUserState(true)">启用</el-button> -->

            </div>
            <div class="edit_query">
                <el-input v-model="queryForm.conditions" size="mini" label-width="60px" placeholder="输入姓名/手机号码"></el-input>
                <el-button type="info" size="mini" class="el-icon-search" @click="loadData()">查询</el-button>
                <el-button type="primary" size="mini" @click="Refresh()">重置</el-button>
            </div>
        </div>

        <!-- 表格 -->
        <el-table :data="table.userList" :header-cell-style="{ 'text-align': 'center' }" @selection-change="selectRows"
            border style="width: 100%" height=450>
            <el-table-column type="selection" width="40" align="center"> </el-table-column>
            <!-- 操作 -->
            <el-table-column fixed="left" label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="updateDiolog(scope.row)">编辑</el-button>
                    <el-button type="text" size="mini" @click="deleteEmployee(scope.row)">删除</el-button>
                    <el-button type="text" size="mini" @click="updateDiolog(scope.row)">密码</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名称" align="center"></el-table-column>
            <el-table-column prop="userId" fixed label="工号" align="center"> </el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
                <template slot-scope="scope">
                    {{ scope.row.sex == 0 ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column prop="phoneNumber" label="用户电话" align="center"></el-table-column>

            <el-table-column prop="address" label="用户住址" align="center"></el-table-column>
            <el-table-column prop="roleStr" label="职位" align="center"></el-table-column>
            <el-table-column label="在职状态" align="center">
                <template slot-scope="scope">
                    {{ scope.row.state === 0 ? '在职' : '停职' }}
                </template>
            </el-table-column>

            <el-table-column prop="practiceLicenseType" label="执业许可证类型" align="center"></el-table-column>
            <el-table-column prop="practiceLicense" label="执业许可证号码" align="center"></el-table-column>
            <el-table-column prop="PracticeCredentials" label="执业资格证号码" align="center"></el-table-column>

        </el-table>
        <!-- 分页 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="table.total"
                :page-sizes="[5, 10, 15, 50]" :current-page="queryForm.page" :page-size="queryForm.row"
                layout="total, sizes, prev, pager, next, jumper" background>
            </el-pagination>
        </div>

        <!-- 添加员工信息弹窗框 -->
        <el-dialog title="新增员工信息" center :visible.sync="dialogObject.addVisible" :close-on-click-modal="false" width="40%">
            <el-form :model="userForm" ref="userForm" label-width="80px" :rules="rules">
                <el-form-item label="员工号" prop="userId">
                    <el-input v-model="userForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="userForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phoneNumber">
                    <el-input type="text" v-model="userForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="userForm.sex" size="mini">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="证件号码" prop="idNumber">
                    <el-input v-model="userForm.idNumber"></el-input>
                </el-form-item>
                <el-form-item label="省区">
                    <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="用户住址" prop="address">
                    <el-input type="text" v-model="userForm.address"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="role">
                    <template>
                        <el-select v-model="userForm.roles" multiple placeholder="请选择">
                            <el-option v-for="item in Roleoptions" :label="item.label" :value="item.label" :key="item.label"></el-option>
                        </el-select>
                    </template>
                </el-form-item>

                <el-form-item label="在职状态" prop="state">
                    <el-radio-group v-model="userForm.state" size="mini">
                        <el-radio :label="0">在职</el-radio>
                        <el-radio :label="1">停职</el-radio>
                        <el-radio :label="2">离职</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="addEmployee()">添 加</el-button>
                <el-button @click="resetForm('userForm')">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 编辑员工信息弹窗框 -->
        <el-dialog title="编辑员工信息" center :visible.sync="dialogObject.updateVisible" :close-on-click-modal="false"
            width="40%">
            <el-form :model="userForm" ref="userForm" label-width="80px" :rules="rules">
                <el-form-item label="员工号" prop="userId">
                    <el-input v-model="userForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="userForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phoneNumber">
                    <el-input type="text" v-model="userForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="userForm.sex" size="mini">
                        <el-radio :label="0">男</el-radio>
                        <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="证件号码" prop="idNumber">
                    <el-input v-model="userForm.idNumber"></el-input>
                </el-form-item>
                <el-form-item label="省区">
                    <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="用户住址" prop="address">
                    <el-input type="text" v-model="userForm.address"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="role">
                    <template>
                        <el-select v-model="userForm.roles" multiple placeholder="请选择" @change="$forceUpdate()">
                            <el-option v-for="item in Roleoptions" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                    </template>
                </el-form-item>

                <el-form-item label="在职状态" prop="state">
                    <el-radio-group v-model="userForm.state" size="mini">
                        <el-radio :label="0">在职</el-radio>
                        <el-radio :label="1">停职</el-radio>
                        <el-radio :label="2">离职</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="success" @click="updateEmployee()">修 改</el-button>
                <el-button @click="resetForm('userForm')">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>
  
<script>
import { regionDataPlus } from 'element-china-area-data';
import provinceAndCity from '@/assets/js/province';
export default {

    data() {
        // 验证手机号的规则
        const cheackMobile = (rule, value, callback) => {
            // 手机号一般最小以“13”开头
            const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (regMobile.test(value)) {
                return callback();
            }
            callback(new Error('请输入合法的手机号!'));
        };

        return {
            queryForm: {
                page: 1,
                row: 10,
                conditions: '',
                departmentId: '',
            },

            //判空验证
            rules: {
                userId: { required: true, message: '用户编号不能为空', trigger: 'blur' },
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: cheackMobile, trigger: 'blur' },
                ],
                password: [{ required: true, message: '密码', trigger: ["blur", 'change'] }],
                roles: [{ required: true, message: '职位不能为空', trigger: 'blur' }],
                userName: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
                address: [{ required: true, message: '用户住址不能为空', trigger: 'blur' }],
                sex: [{ required: true, message: '用户性别不能为空', trigger: 'blur' }],
            },
            selectedOptions: [],
            options: regionDataPlus,
            provinceAndCity,
            search: { current: 1, size: 6 },

            userForm: {
                //存取添加或者修改的用户的数据
                userId: '',
                userName: '',
                sex: 0,
                roles: [],
                state: 0,
                phone: '',
                address: '',
                idNumber: '',
            },

            userStates: [],

            table: {
                userList: [], //后台返回的用户表数据
                total: 0,         //分页
            },

            dialogObject: {
                addVisible: false,
                updateVisible: false,
            },

            Roleoptions: [{
                value: 'Admin',
                label: '管理员'
            }, {
                value: 'Doctor',
                label: '医生'
            }, {
                value: 'Cashier',
                label: '收银员'
            }, {
                value: 'Reception',
                label: '前台'
            }],

            // Roleoptions: [{
            //     label: '管理员'
            // }, {
            //     label: '医生'
            // }, {
            //     label: '收银员'
            // }, {
            //     label: '前台'
            // }],

        };
    },
    methods: {
        loadData() {
            this.GetUserList();
        },
        //获取用户数据
        async GetUserList() {

            await this.$api.employee.GetEmployeeList(this.queryForm.page, this.queryForm.row, this.queryForm.conditions).then((res) => {
                const { returnData, success, message } = res.data;
                console.log(res.data);
                if (!success) {
                    return;
                }
                this.table.userList = returnData;
                this.table.total = res.data.count;
            });
        },

        //重置非空提示
        resetForm() {
            this.dialogObject.addVisible = false;
            this.dialogObject.updateVisible = false;
            this.$refs['userForm'].resetFields();
        },


        //打开修改用户弹窗
        updateDiolog(row) {
            console.log(row);
            // console.log(this.Roleoptions.filter(option => row.roleStr.split(",").includes(option.label)));
            // let filteredOptions = Roleoptions.filter(option => option.label.startsWith('医生'));
            this.userForm = { ...row }
            this.dialogObject.updateVisible = true;
            // this.userForm.userId = row.userId;
            // this.userForm.userName = row.name;
            // this.userForm.sex = row.sex;
            // this.userForm.address = row.address;
            // this.userForm.phone = row.phone;
            // this.userForm.position = row.position;
            this.userForm.roles = row.roleStr.split(",")//this.Roleoptions.filter(option=>row.roleStr.split(",").includes(option.label));



            console.log(this.userForm);
        },
        //修改用户数据
        updateEmployee() {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    const user = {
                        userId: this.userForm.userId,
                        userName: this.userForm.userName,
                        password: this.userForm.password,
                        sex: this.userForm.sex,
                        roles: this.userForm.roles,
                        state: this.userForm.state,
                        phoneNumber: this.userForm.phoneNumber,
                        address: this.userForm.areadata + this.userForm.address,
                    };

                    console.log(user);
                    this.$api.employee.updateUser(user).then((res) => {
                        const { data, success, message } = res.data;
                        console.log(data);
                        if (!success) {
                            this.$message({ message: '修改失败！', type: 'error' });
                        } else {
                            this.$message({ message: '修改成功！', type: 'success' });
                            this.dialogObject.updateVisible = false;
                            this.loadData();
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        //打开添加用户弹窗
        openAddEmployeeDialog() {
            this.dialogObject.addVisible = true;
            this.userForm.userId = '';
            this.userForm.userName = '';
            this.userForm.sex = '';
            this.userForm.address = '';
            this.userForm.phoneNumber = '';
            this.userForm.position = '';
            this.userForm.roles = []
        },
        //添加用户数据
        addEmployee() {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    
                    console.log(this.userForm.areadata);
                    const user = {
                        userId: this.userForm.userId,
                        userName: this.userForm.userName,
                        password: this.userForm.password,
                        sex: this.userForm.sex,
                        roles: this.userForm.roles,
                        state: this.userForm.state,
                        phoneNumber: this.userForm.phoneNumber,
                        address: this.userForm.areadata + this.userForm.address,
                    };
                    console.log(user);
                    this.$api.employee.AddUserInfo(user).then((res) => {
                        console.log(user);
                        const { data, success, message } = res.data;
                        if (!success) {
                            this.$message({ message: '添加失败！', type: 'error' });
                        } else {
                            this.$message({ message: '添加成功！', type: 'success' });
                            this.dialogObject.addVisible = false;
                            this.loadData();
                        }
                    });
                } else {
                    return false;
                }
            });
        },

        //获取选中行的数据
        selectRows(selection) {
            this.userStates = [];
            selection.forEach((element) => {
                this.userStates.push({ userId: element.userId, state: element.state });
            });
        },
        //删除用户
        deleteEmployee(row) {
            this.$api.employee.DeleteUser(row.userId).then((res) => {
                let { success, message } = res.data;
                if (!success) {
                    this.$message.error('删除失败！');
                } else {
                    this.$message({ message: '删除成功！', type: 'success' });
                    this.loadData();
                }
            });

        },

        UpdateUserState(opStateType) {
            console.log(opStateType);
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
            this.userForm.areadata = '';
            this.userForm.areadata = this.search.province + this.search.city + this.search.district;
        },
    },

    created() {
        this.loadData();
    },
};
</script>
  
<style lang="less" scoped>
.employee_container {
    width: auto;
    height: auto;

    .editbar {
        width: 100%;
        margin: 5px 0px;
        padding: 2px 0px;
        display: grid;
        grid-template-columns: 2fr 0.9fr;

        .edit_btn {
            display: flex;
            flex-direction: row;
            margin-left: 15px;

            div {
                margin-left: 10px;
            }
        }

        .edit_query {
            width: 600px;
            display: flex;
            grid-column-gap: 10px;
        }
    }

    .block {
        margin-top: 15px;
        float: left;
    }
}
</style>
  