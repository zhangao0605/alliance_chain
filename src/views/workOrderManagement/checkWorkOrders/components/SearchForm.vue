<template>
  <el-row>
    <el-col :span="4">
      <label for="workOrderId">编号：</label><el-input v-model="data.workOrderId" style="width: 60%" id="workOrderId"></el-input>
    </el-col>
    <el-col :span="6">
      <label>时间：</label>
      <el-date-picker
        style="width: 75%"
        id="dateRanges"
        v-model="data.dateRange"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-col>
    <el-col :span="5">
      <label>分类：</label>
      <el-select v-model="data.questionClass" placeholder="请选择" clearable style="width: 60%" id="questionClass">
        <el-option
          v-for="item in questionClassList"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="5"> <el-button type="primary" :loading="btnLoading" @click="toSearch">查询</el-button></el-col>
  </el-row>
</template>

<script>
  import { WorkOrderQuestionClassEnum } from '../../../../utils/data/enum'
  export default {
    name: 'SearchTerms',
    data () {
      const questionClassList = [
        {name: '合约类', value: WorkOrderQuestionClassEnum.CONTRACT},
        {name: '节点类', value: WorkOrderQuestionClassEnum.NODE}
      ]
      return {
        data: {
          workOrderId: '',
          dateRange:'',
          questionClass: '', // 问题分类
        },
        questionClassList:questionClassList,
        btnLoading: false
      }
    },
    created () {
      this.toSearch()
    },
    methods: {
      toSearch () {
        this.$emit('handleSearchTerms',this.data)
      }
    }
  }
</script>

<style scoped>

</style>
