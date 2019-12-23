<template>
  <div id="workOrderDetail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/checkWorkOrders' }">我的工单</el-breadcrumb-item>
      <el-breadcrumb-item>审批工单</el-breadcrumb-item>
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
          <el-button round size="small" style="padding: 3px 25px" class="download-btn tcw_color_primary" @click="downloadContractCode" ><i class="el-icon-download" style="font-size:18px"></i>下载</el-button>
        </el-col>
        <el-col :span="6" v-if="isAllianceLeader && workOrderInfo.typeName === '合约类'">
          <label>接口文档：</label>
          <el-button round size="small" style="padding: 3px 25px" class="download-btn tcw_color_primary"  @click="downloadAPIDocument" ><i class="el-icon-download" style="font-size:18px"></i>下载</el-button>
        </el-col>
      </el-row>
      <el-row class="__btn-group">
        <el-button round style="width: 200px" type="primary" :loading="btnApprovedLoading" @click="reviewWorkOrder(WorkOrderOperationStatusEnum.APPROVED)">审核通过</el-button>
        <el-button round style="width: 200px; margin-left: 3%"  @click="tipsBeforeReviewing(WorkOrderOperationStatusEnum.REJECTED)">驳回申请</el-button>
      </el-row>
    </div>
    <el-dialog title="提示" :visible.sync="showRejectReasonsDialog" width="700px">
      <el-form>
        <el-input
          type="textarea"
          maxlength="200"
          show-word-limit
          :autosize="{ minRows: 3, maxRows: 3}"
          placeholder="请填写驳回工单的理由，200字符内"
          v-model="rejectReasons">
        </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="showRejectReasonsDialog = false">取消</el-button>
        <el-button type="primary" :loading="btnRejectedLoading" @click="reviewWorkOrder(WorkOrderOperationStatusEnum.REJECTED)">确认驳回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { isNullOrEmpty } from '../../../utils/tools'
  import {  WorkOrderOperationStatusEnum } from '../../../utils/data/enum'
  import workOrderManagementApi from '../../../apis/workOrderManagementApi'

  const{ mapState } = createNamespacedHelpers('user')
  const { auditWorkOrder } = workOrderManagementApi

  export default {
    data () {
      return {
        workOrderId: null,
        workOrderInfo: {},
        btnApprovedLoading:false,
        btnRejectedLoading:false,
        WorkOrderOperationStatusEnum: WorkOrderOperationStatusEnum,
        showRejectReasonsDialog: false,
        rejectReasons: ''
      }
    },
    created () {
      this.getWorkOrderInfo()
    },
    computed: {
      ...mapState(['isAllianceLeader']),

    },
    methods: {
      getWorkOrderInfo () {
        this.workOrderId = Number(this.$route.params.workOrderId)
        workOrderManagementApi.workOrderDetail(this.workOrderId).then((res) => {
          this.workOrderInfo = res['data'] || {}
        }).then((err) => {
          // TODO
        })
      },
      downloadContractCode () {

      },
      downloadAPIDocument () {

      },
      tipsBeforeReviewing (status) {
        if (status === WorkOrderOperationStatusEnum.REJECTED) {
          this.showRejectReasonsDialog = true
        }
      },
      reviewWorkOrder (status) {
        if( status === WorkOrderOperationStatusEnum.APPROVED){
           this.btnApprovedLoading = true
        } else if ( status === WorkOrderOperationStatusEnum.REJECTED) {
          this.btnRejectedLoading = true
        }
        auditWorkOrder(this.workOrderId, status, this.rejectReasons).then(() => {
          this.$alert(`工单<span class="tcw_color_primary">"${this.workOrderInfo.serialNo}"</span>${status === WorkOrderOperationStatusEnum.APPROVED? '已通过审核': '已被驳回 '}`, '提示', {
            showClose: false,
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
          }).then(() => {
            this.$router.replace('/checkWorkOrders')
          })
          this.showRejectReasonsDialog = false
          this.btnApprovedLoading = false
          this.btnRejectedLoading = false
        }).catch(() => {
          this.btnApprovedLoading = false
          this.btnRejectedLoading = false
        })
      },
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
    .__btn-group{
      width: 100%;
      text-align: center;
      margin-top: 80px;
    }
  }

</style>
