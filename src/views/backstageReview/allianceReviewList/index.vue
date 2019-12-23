<template>
  <div id="alliance-list">
    <el-tabs v-model="reviewStatus" @tab-click="onStatusChange">
      <el-tab-pane label="全部" :name="ReviewStatusEnum.ALL + ''">全部</el-tab-pane>
      <el-tab-pane label="待审核" :name="ReviewStatusEnum.NO_OPERATION + ''">待审核</el-tab-pane>
      <el-tab-pane label="已通过" :name="ReviewStatusEnum.APPROVED + ''">已通过</el-tab-pane>
      <el-tab-pane label="已驳回" :name="ReviewStatusEnum.REJECTED + ''">已驳回</el-tab-pane>
    </el-tabs>
    <el-table
    :data="tableData"
    v-loading="tableLoading"
    border
    :style="{ marginTop: '30px'}">
      <el-table-column
        prop="createTime"
        align="center"
        width="180px"
        :formatter="formatTime"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="联盟名称">
      </el-table-column>
      <el-table-column
        prop="companyName"
        align="center"
        label="盟主单位">
      </el-table-column>
      <el-table-column
        prop="vocation"
        align="center"
        label="联盟类型">
      </el-table-column>
      <el-table-column
        prop="status"
        :formatter="formatReviewStatus"
        align="center"
        label="审批状态">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.REJECTED || reviewStatus == ReviewStatusEnum.APPROVED"
        prop="updateTime"
        align="center"
        width="180px"
        :formatter="formatTime"
        :label="reviewStatus == ReviewStatusEnum.APPROVED ? '通过时间':'驳回时间'">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.APPROVED"
        prop="companyCount"
        align="center"
        width="110px"
        label="联盟内企业数">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.APPROVED"
        prop="chainCount"
        align="center"
        width="110px"
        label="联盟内链条数">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.APPROVED"
        prop="address"
        align="center"
        width="120px"
        label="联盟内合约数量">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.APPROVED"
        prop="id"
        align="center"
        label="联盟编号">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.NO_OPERATION"
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-link @click="toReview(scope.row)" type="primary" size="small" :underline="false">审批</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="dataTotal && dataTotal/rows > 1"
      background
      style="width: 100%; text-align: right; margin-top: 20px"
      @current-change="handlePageChange"
      :current-page.sync="pageIndex"
      :page-size="rows"
      layout=" prev, pager, next"
      :total="dataTotal">
    </el-pagination>
    <el-dialog
      class="review-dialog"
      title="联盟申请审批"
      :before-close="handleDialogClose"
      :visible.sync="showReviewDialog"
      width="40%">
      <el-form ref="form" :model="currentAllianceDetail" label-width="180px">
        <el-form-item label="申请单位名称">
          <span>{{currentAllianceDetail.companyName}}</span>
        </el-form-item>
        <el-form-item label="联盟名称">
          <span>{{currentAllianceDetail.name}}</span>
        </el-form-item>
        <el-form-item label="所属行业">
          <span>{{currentAllianceDetail.vocation}}</span>
        </el-form-item>
        <el-form-item label="联盟用途">
          <span>{{currentAllianceDetail.description}}</span>
        </el-form-item>
        <el-form-item label="联系电话">
          <span>{{currentAllianceDetail.phone}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="approve">同意申请</el-button>
        <el-button type="primary" @click="reject">驳回申请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { AllianceReviewStatusEnum } from '../../../utils/data/enum'
  import filters from '../../../filters'
  import backstageReviewApi from '../../../apis/backstageReviewApi'
  const { timeFormat } = filters
  const { getAllianceReviewList, getAllianceReviewDetail, reviewAlliance } = backstageReviewApi
  export default {
    data () {
      return {
        reviewStatus: AllianceReviewStatusEnum.ALL + '',
        tableData: [],
        ReviewStatusEnum: AllianceReviewStatusEnum,
        showReviewDialog: false,
        currentAllianceDetail: {},
        dataTotal: 0,
        pageIndex: 1,
        rows: 10,
        tableLoading: false
      }
    },
    watch: {
      '$route': function () {
        this.init()
      }
    },
    created () {
      this.init()
    },
    methods: {
      init(){
        this.getReviewList()
      },
      onStatusChange () {
        this.pageIndex = 1
        this.getReviewList()
      },
      handlePageChange () {
        this.getReviewList()
      },
      getReviewList () {
        this.tableLoading = true
        getAllianceReviewList(this.pageIndex, this.rows, Number(this.reviewStatus)).then((res) => {
          let data = res['data'] || {}
          this.tableData = data.data
          this.dataTotal = data.total
          this.tableLoading = false
        })
      },
      toReview (item) {
        if (item.status == AllianceReviewStatusEnum.NO_OPERATION ) {
          getAllianceReviewDetail(item.id).then((res) => {
            this.currentAllianceDetail = res['data'] || {}
          })
          this.showReviewDialog = true
        }
      },
      approve () {
        this.review(AllianceReviewStatusEnum.APPROVED)
      },
      reject () {
        this.review(AllianceReviewStatusEnum.REJECTED)
      },
      review (status) {
        console.log(status)
        reviewAlliance(this.currentAllianceDetail.id, status).then(() => {
          let detail = this.currentAllianceDetail || {}
          let tips = `${detail.name}${status == AllianceReviewStatusEnum.APPROVED ? '已通过审核' : status == AllianceReviewStatusEnum.REJECTED? '已被驳回' : ''}`
          this.$message({
            message: tips,
            type: 'success'
          })
          let that = this
          setTimeout(() => {
            that.showReviewDialog = false
          },500)
          this.getReviewList()
        }).catch(() => {
          this.showReviewDialog = false
        })
      },
      formatReviewStatus (row,column) {
        var status = row[column.property];
        status = Number(status)
        if(this.$isNullOrEmpty(status)){return ''}
        switch (status) {
          case  AllianceReviewStatusEnum.NO_OPERATION: return '待审核';
          case  AllianceReviewStatusEnum.APPROVED: return '已通过';
          case  AllianceReviewStatusEnum.REJECTED: return '已驳回';
        }
      },
      formatTime (row,column) {
        var time = row[column.property];
        if(this.$isNullOrEmpty(time)){return ''}
        return timeFormat(time,'YYYY-MM-DD HH:mm:ss')
      },
      handleDialogClose () {
        this.currentAllianceDetail = {}
        this.showReviewDialog = false
      }
    }
  }
</script>

<style scoped lang="scss">
  #alliance-list{
    /deep/.review-dialog{
      .el-form-item{
        margin-bottom: 5px;
      }
      .el-dialog__header,.el-dialog__footer {
        text-align: center;
      }
    }
    /deep/.el-tabs__content{
      display: none;
    }
  }
</style>
