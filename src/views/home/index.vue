<template>
    <div class="home-contianer">
        <el-scrollbar style="height: 100%">
            <div style>
                <div class="left" v-loading="fullscreenLoading" style="margin: 15px; margin-top: 0">
                    <!-- 基础数据统计-->
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <div class="statistics">
                                <div class="left"><i class="el-icon-user-solid" style="font-size: 50px;"></i></div>
                                <div class="right">
                                    <div class="top" style="">接诊患者总人次</div>
                                    <div class="bottom">52</div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="statistics">
                                <div class="left"><i class="el-icon-message-solid" style="font-size: 50px;"></i></div>
                                <div class="right">
                                    <div class="top" style="">今日已就诊</div>
                                    <div class="bottom">2</div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="statistics">
                                <div class="left"><i class="el-icon-user-solid" style="font-size: 50px;"></i></div>
                                <div class="right">
                                    <div class="top" style="">今日已预约</div>
                                    <div class="bottom">20</div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="statistics">
                                <div class="left"><i class="el-icon-user-solid" style="font-size: 50px;"></i></div>
                                <div class="right">
                                    <div class="top" style="">今日总收入</div>
                                    <div class="bottom">20</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>

                    <!-- 常用功能 -->
                    <div class="charts-line">
                        <div id="charts-line" class="left" style="height: 700px">
                            <el-tabs tab-position="left" style="height: 200px;">
                                <el-tab-pane label="诊所消息">
                                    <el-collapse accordion>
                                        <el-collapse-item>
                                            <template slot="title">
                                                一致性 Consistency<i class="header-icon el-icon-info"></i>
                                            </template>
                                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                                        </el-collapse-item>
                                        <el-collapse-item title="反馈 Feedback">
                                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </el-tab-pane>
                                <el-tab-pane label="库房警报">
                                    <el-collapse accordion>
                                        <el-collapse-item>
                                            <template slot="title">
                                                药品库存预警<i class="header-icon el-icon-info"></i>
                                            </template>
                                            <div>甲硝唑片 0.2g X 24库存低于警告库存10</div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </el-tab-pane>
                                <el-tab-pane label="今日就诊">今日就诊</el-tab-pane>
                                <el-tab-pane label="明日预约">明日预约</el-tab-pane>
                            </el-tabs>
                        </div>

                        <div class="right">
                            <el-tabs v-model="right_activeName">
                                <el-tab-pane label="今日任务" name="user">
                                    <el-descriptions class="margin-top" :column="1" border>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-mobile-phone"></i>
                                                今日份我的就诊人次
                                            </template>
                                            {{ 1 }}人
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-location-outline"></i>
                                                今日份我的预约人次
                                            </template>
                                            {{1 }}人
                                        </el-descriptions-item>
                                        <el-descriptions-item>
                                            <template slot="label">
                                                <i class="el-icon-tickets"></i>
                                                今日份个人营收诊金
                                            </template>
                                            200￥
                                        </el-descriptions-item>
                                    </el-descriptions>
                                </el-tab-pane>
                            </el-tabs>
                            <div class="user-item"></div>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            centerDialogVisible: false,
            input: '',
            announcement: [],
            activeNames: ['1'],
            todayLoginTotal: 0,
            skuTotal: 0,
            userTotal: 0,
            OrderTotalPrice: 0,
            todayPlanAppTotal: 0,
            salesTotalPrice: 0,
            activeMessageId: '',
            right_activeName: 'user',
            salesDateType: 'year',
            goodsCount: 0, //物资总数
            totalCost: 0, //仓库总成本
            fullscreenLoading: false,
            Userinfo: [],

            announcementList: [],

            //非空提示
            rules: {
                announcementName: [{ required: true, message: '系统公告主题不能为空', trigger: 'change' }],
                announcementcontent: [{ required: true, message: '系统公告内容不能为空', trigger: 'blur' }],
            },

            //存取修改系统公告的数据
            announcementForm: {
                announcementName: '',
                announcementcontent: '',
                announcementId: '',
            },

            //模态框
            dialogObject: {
                addVisible: false, //添加模态框默认为关闭
                updateVisible: false, //修改模态框默认为关闭
            },
        };
    },
    methods: {
        loadData() {
            this.Getannouncement();
        },
    },
    created() {

    },
};
</script>
<style lang="less" scoped>
.home-contianer {
    background: #efefef;
    width: 100%;
    height: 100%;


    /* padding: 20px; */
    .el-row {
        margin: 15px 0px 5px 0px;
        background-color: rgb(251, 251, 251);
        border-radius: 5px 5px 5px 5px;

        .statistics {
            color: white;
            height: 90px;
            background-color: rgb(71, 166, 160);
            border-radius: 4px;
            padding: 0 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            // margin-left: 30px;

            .left {
                flex: 0 0 30%;
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .top {
                padding-top: 10px;
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                font-size: 19px;
            }

            .bottom {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                // font-weight: bold;
                font-size: 17px;
            }

            div {
                padding-bottom: 14px;
            }

            .title {
                display: flex; // 弹性布局
                justify-content: space-between; // 两边对齐
                align-items: center; // 垂直居中
            }

            p {
                font-size: 13px;
                font-weight: bold;
            }

            .num {
                font-size: 18px;
                font-weight: bold;
                text-align: center;
            }

            .tip {
                font-size: 12px;
            }
        }
    }

    .charts-line {
        margin: 15px 0px 5px 0px;
        display: flex;

        .left {
            flex: 1;
            background: white;
            padding: 10px;

            .el-collapse {
                font-size: 16px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                width: 100%;
                overflow: auto;
                padding-left: 10px;

                .collapseContent {
                    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
                    font-size: 16px;
                    margin-bottom: 10px;
                }

                .announcementTime {
                    float: right;
                }

                .announcementButton {
                    float: right;
                }
            }
        }

        .right {
            padding: 10px 15px;
            background: white;
            height: 700px;
            width: 450px;
            margin-left: 16px;

            .el-tabs {
                padding-left: 10px;

                .often {
                    >p {
                        margin-bottom: 20px;
                        font-size: 150px;
                        line-height: 20px;
                    }

                    >p:hover {
                        background-color: rgb(250, 255, 253);
                    }
                }
            }
        }
    }
}

.ivu-card-body {
    text-align: center;
    padding: 25px 13px;
    padding-left: 80px;
}

.demo-color-name {
    color: #fff;
    font-size: 16px;
}

.demo-color-desc {
    color: #fff;
    opacity: 0.7;
}

.ivu-card {
    position: relative;
}

.ivu-card .icon-left {
    border-right: 1px solid;
    padding: 10px 24px;
    height: 100%;
    position: absolute;
    font-size: 50px;
    color: white;
}
</style>
  