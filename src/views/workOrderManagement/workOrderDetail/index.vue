<template>
  <div id="workOrderDetail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/checkWorkOrders' }">我的工单</el-breadcrumb-item>
      <el-breadcrumb-item>查看工单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block detail tcw_container tcw_height_auto">
      <el-row>
        <el-col :span="6">
          <label>工单编号：</label>
          <span>{{workOrderInfo.serialNo}}</span>
        </el-col>
        <el-col :span="6">
          <label>申请单位：</label>
          <span>{{workOrderInfo.companyName}}</span>
        </el-col>
        <el-col :span="6">
          <label>问题分类：</label>
          <span>{{workOrderInfo.typeName}}</span>
        </el-col>
        <el-col :span="6">
          <label>项目类型：</label>
          <span>{{workOrderInfo.item}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>所属区块链：</label>
          <span>{{workOrderInfo.chainName}}</span>
        </el-col>
        <el-col :span="6" v-if="workOrderInfo.typeName === '合约类'">
          <label>合约名称：</label>
          <span>{{workOrderInfo.contractName}}</span>
        </el-col>
        <el-col :span="6" v-if="isAllianceLeader && workOrderInfo.typeName === '合约类'">
          <label>合约代码：</label>
          <el-button class="download-btn" size="small" style="padding: 3px 25px" @click="downloadContractCode" :loading="btnLoading1"><i class="el-icon-download" style="font-size:18px"></i>下载</el-button>
        </el-col>
        <el-col :span="6" v-if="isAllianceLeader && workOrderInfo.typeName === '合约类'">
          <label>接口文档：</label>
          <el-button class="download-btn"  size="small" style="padding: 3px 25px" @click="downloadAPIDocument" :loading="btnLoading2"><i class="el-icon-download" style="font-size:18px"></i>下载</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <label>审批结果：</label>
          <span :class="{tcw_color_alert:workOrderInfo.status === WorkOrderOperationStatusEnum.REJECTED,
        tcw_color_primary:workOrderInfo.status === WorkOrderOperationStatusEnum.APPROVED,
        color_blur:workOrderInfo.status === WorkOrderOperationStatusEnum.NO_OPERATION}">{{transformReviewState(workOrderInfo.status)}}</span>
        </el-col>
        <el-col v-if="workOrderInfo.status === WorkOrderOperationStatusEnum.REJECTED">
          <label>驳回理由：</label>
          <span>{{workOrderInfo.remark}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { isNullOrEmpty } from '../../../utils/tools'
  import { WorkOrderOperationStatusEnum } from '../../../utils/data/enum'
  import workOrderManagementApi from '../../../apis/workOrderManagementApi'
  const{ mapState } = createNamespacedHelpers('user')
  export default {
    data () {
      return {
        workOrderInfo: {},
        btnLoading1:false,
        btnLoading2:false,
        WorkOrderOperationStatusEnum:WorkOrderOperationStatusEnum
      }
    },
    created () {
      this.getWorkOrderInfo()
    },
    computed: {
      ...mapState(['']),
      isAllianceLeader () {
        return this.$store.getters.isAllianceLeader
      },
    },
    methods: {
      getWorkOrderInfo () {
        let id = Number(this.$route.params.workOrderId)
        workOrderManagementApi.workOrderDetail(id).then((res) => {
          this.workOrderInfo = res['data'] || {}
        }).then((err) => {
          // TODO
        })
      },
      downloadContractCode () {
        this.btnLoading1 = true
      },
      downloadAPIDocument () {
        this.btnLoading2 = true
      },
      transformReviewState (status) {
        status = Number(status)
        if (isNullOrEmpty(status)) {
          return
        }
        switch (status) {
          case WorkOrderOperationStatusEnum.NO_OPERATION: return '待审批';
          case WorkOrderOperationStatusEnum.APPROVED: return '已通过';
          case WorkOrderOperationStatusEnum.REJECTED: return '已驳回';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #workOrderDetail{
    .block{
      margin-top: 40px;
    }
    .detail{
      >div{
        margin-bottom: 30px;
        >div{
          display: inline-block;
        }
      }
    }
    .color_blur{
      color: #428eff;
    }
    label{
      display: inline-block;
      width: 100px;
      color: #666;
      text-align: right;
      margin-right: 10px;
    }
    span{
      color: #333
    }
  }

</style>
