<template>
  <el-table
    class="block"
    :data="data"
    border
    v-loading="tableLoading"
    style="width: 100%">
    <el-table-column
      prop="serialNo"
      align="center"
      label="工单编号"
      width="180">
    </el-table-column>
    <el-table-column
      v-if="isAllianceLeader"
      prop="companyName"
      align="center"
      label="提交单位"
      width="180">
    </el-table-column>
    <el-table-column
      align="center"
      label="问题标题"
      width="180">
      <template slot-scope="scope">
          <span
            class="tcw_text">{{scope.row.title}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="item"
      align="center"
      class="tcw_text"
      label="项目类型">
    </el-table-column>
    <el-table-column
      prop="createTime"
      align="center"
      :formatter="formatTime"
      label="提交时间">
    </el-table-column>
    <el-table-column
      prop="status"
      :formatter="formatStatus"
      align="center"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="name"
      align="center"
      label="操作">
      <template slot-scope="scope">
        <el-link @click="handleOperation(scope.row)" type="primary" :underline="false">
          {{isAllianceLeader && operationState - 0 === WorkOrderOperationStatusEnum.NO_OPERATION ? '审批' :'查看'}}
        </el-link>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import filters from '@/filters'
  import { WorkOrderOperationStatusEnum } from '@/utils/data/enum'

  const { timeFormat } = filters

  export default {
    name: 'WorkOrderList',
    props: ['data','operationState','isAllianceLeader','tableLoading'],
    data () {
      return {
        WorkOrderOperationStatusEnum: WorkOrderOperationStatusEnum
      }
    },
    methods: {
      handleOperation (item) {
        if(!item){
          return
        }
        this.$storage.temp('session', 'workOrderInfo', item)
        console.log(item)
        if(item.status - 0 === WorkOrderOperationStatusEnum.NO_OPERATION && this.isAllianceLeader){
          this.$router.push({
            name:'reviewWorkOrder',
            params:{workOrderId: item.id}
          })
        } else {
          this.$router.push({
            name:'workOrderDetail',
            params:{workOrderId: item.id}
          })
        }

      },
      formatTime (row,column) {
        var time = row[column.property];
        if(this.$isNullOrEmpty(time)){return ''}
        return timeFormat(time,'YYYY-MM-DD  HH:mm:ss')
      },
      formatStatus (row,column) {
        var status = row[column.property];
        status = Number(status)
        if(this.$isNullOrEmpty(status)){return ''}
        switch (status) {
          case WorkOrderOperationStatusEnum.NO_OPERATION: return '处理中';
          case WorkOrderOperationStatusEnum.APPROVED:  return '通过审核';
          case WorkOrderOperationStatusEnum.REJECTED:  return '被驳回';
        }
      }
    }
  }
</script>

<style scoped>

</style>
