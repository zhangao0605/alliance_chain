<template>
  <div id="qualification-list">
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
      style="margin-top: 30px">
      <el-table-column
        prop="createTime"
        align="center"
        :formatter="formatTime"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="email"
        align="center"
        label="单位用户名">
      </el-table-column>
      <el-table-column
        prop="companyType"
        align="center"
        label="单位类型">
      </el-table-column>
      <el-table-column
        prop="companyName"
        align="center"
        label="单位名称">
      </el-table-column>
      <el-table-column
        prop="socialCreditCode"
        align="center"
        label="社会信用代码">
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        :formatter="formatReviewStatus"
        label="审批状态">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.REJECTED || reviewStatus == ReviewStatusEnum.APPROVED"
        prop="checkTime"
        align="center"
        :formatter="formatTime"
        :label="reviewStatus == ReviewStatusEnum.APPROVED ? '通过时间':'驳回时间'">
      </el-table-column>
     <!-- <el-table-column
        v-if="reviewStatus === ReviewStatusEnum.APPROVED"
        prop="address"
        align="center"
        label="创建的联盟">
      </el-table-column>
      <el-table-column
        v-if="reviewStatus === ReviewStatusEnum.APPROVED"
        prop="address"
        align="center"
        label="加入的联盟">
      </el-table-column>-->
      <el-table-column
        v-if="reviewStatus == ReviewStatusEnum.NO_OPERATION"
          align="center"
          label="操作">
        <template slot-scope="scope" v-if="reviewStatus - 0 === ReviewStatusEnum.NO_OPERATION">
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
  </div>
</template>

<script>
  import { QualificationReviewStatusEnum } from '../../../utils/data/enum'
  import backstageReviewApi from '../../../apis/backstageReviewApi'
  import filters from '../../../filters'
  const { timeFormat } = filters
  const { getQualificationReviewList } = backstageReviewApi
  export default {
    data () {
      return {
        reviewStatus: QualificationReviewStatusEnum.ALL + '',
        tableData: [],
        ReviewStatusEnum: QualificationReviewStatusEnum,
        pageIndex: 1,
        rows: 10,
        dataTotal: 0,
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
        getQualificationReviewList(this.pageIndex, this.rows, Number(this.reviewStatus)).then((res) => {
          let data = res['data'] || {}
          this.tableData = data.data
          this.dataTotal = data.total
          this.tableLoading = false
        }).catch(() => {
          // TODO
        })
      },
      toReview (item) {
        if (item.status == QualificationReviewStatusEnum.NO_OPERATION ) {
          this.$router.push({name: 'qualificationReview', params: {id: item.id}})
        }
      },
      formatReviewStatus (row,column) {
        var status = row[column.property];
        status = Number(status)
        if(this.$isNullOrEmpty(status)){return ''}
        switch (status) {
          case  QualificationReviewStatusEnum.NO_OPERATION: return '待审核';
          case  QualificationReviewStatusEnum.APPROVED: return '已通过';
          case  QualificationReviewStatusEnum.REJECTED: return '已驳回';
        }
      },
      formatTime (row,column) {
        var time = row[column.property];
        if(this.$isNullOrEmpty(time)){return ''}
        return timeFormat(time,'YYYY-MM-DD HH:mm:ss')
      },
    }
  }
</script>

<style scoped lang="scss">
  #qualification-list{
    /deep/.el-tabs__content{
      display: none;
    }
  }
</style>
