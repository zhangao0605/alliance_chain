<template>
  <div id="checkWorkOrders">
    <div class="tcw_main_title" v-if="!isAllianceLeader">我的工单</div>
    <el-tabs v-model="operationStatusActive" @tab-click="onChangeOperationStatus" v-if="isAllianceLeader">
      <el-tab-pane label="待处理工单" :name="WorkOrderOperationStatusEnum.NO_OPERATION + ''">待处理工单</el-tab-pane>
      <el-tab-pane label="已处理工单" :name="WorkOrderOperationStatusEnum.OPERATED + ''">已处工单</el-tab-pane>
    </el-tabs>
    <SearchTerms class="block" @handleSearchTerms="getFilterConditions" ref="searchTerms"/>
    <WorkOrderList :data="tableData"  :tableLoading="tableLoading" :operationState="operationStatusActive" :isAllianceLeader="isAllianceLeader"/>
    <el-pagination
      v-show="dataTotal && dataTotal/pageSize > 1"
      background
      style="width: 100%; text-align: right; margin-top: 20px"
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="pageIndex"
      :total= "dataTotal"
      @current-change="getWorkOrderList">
    </el-pagination>
  </div>
</template>

<script>
  import SearchTerms from './components/SearchForm'
  import WorkOrderList from './components/WorkOrderList'
  import filters from '@/filters'
  import workOrderManagementApi from '../../../apis/workOrderManagementApi'
  import { WorkOrderOperationStatusEnum, IsAllianceLeader } from '../../../utils/data/enum'
  import { createNamespacedHelpers } from 'vuex'

  const { mapState } = createNamespacedHelpers('user')
  const { timeFormat } = filters
  const { getWorkOrderList } = workOrderManagementApi

  export default {
    name: 'index',
    components: { SearchTerms, WorkOrderList},
    data () {
      return {
        operationStatusActive: WorkOrderOperationStatusEnum.NO_OPERATION, //待处理或已处理
        btnLoading: false,
        WorkOrderOperationStatusEnum: WorkOrderOperationStatusEnum,
        tableData: [],
        dataTotal: 0,
        pageSize: 10,
        pageIndex: 1,
        workOrderId: '',
        startTime: '',
        endTime: '',
        questionClass: '',
        tableLoading: ''
      }
    },
    computed: {
      isAllianceLeader () {
        return this.$store.getters.isAllianceLeader
      }
    },
    methods: {
      getFilterConditions (terms) {
        let {workOrderId, dateRange, questionClass} = terms
        if(dateRange && dateRange.length){
          this.startTime = dateRange[0] && dateRange[0].getTime() / 1000
          this.endTime = dateRange[1] && dateRange[1].getTime() / 1000
        }
        this.workOrderId = workOrderId
        this.questionClass = questionClass
        this.pageIndex = 1
        this.getWorkOrderList()
      },
      onChangeOperationStatus () {
        this.pageIndex = 1
        this.getWorkOrderList()
      },
      getWorkOrderList () {
        let status = Number(this.operationStatusActive), statusParams
        this.tableLoading = true
        if ( status === WorkOrderOperationStatusEnum.OPERATED) {
          statusParams = WorkOrderOperationStatusEnum.APPROVED + ',' + WorkOrderOperationStatusEnum.REJECTED
        } else {
          statusParams = this.operationStatusActive + ''
        }
        getWorkOrderList(this.pageIndex, this.pageSize , this.workOrderId, this.startTime, this.endTime, this.questionClass, this.isAllianceLeader, statusParams).then((res) => {
          let data = res['data'] || {}
          this.tableData = data.data || []
          this.dataTotal = data.total || 0
          this.tableLoading = false
        }).catch(() => {
          // TODO
        })

      },
      formatTime (row,column) {
        var time = row[column.property];
        if(this.$isNullOrEmpty(time)){return ''}
        return timeFormat(time,'YYYY-MM-DD  HH:mm:ss')
      },
      compare(property){
        if(!property){
          retrun
        }
        return function(a, b){
          return a[property] - b[property] >= 0
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #checkWorkOrders{
    .block{
       margin-top: 30px;
    }
    /deep/.el-tabs__content{
      display: none;
    }
  }
</style>
