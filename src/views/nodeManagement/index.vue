<template>
  <div id="node-management">
    <el-row>
      <el-col class="tcw_main_title">
      <span>节点管理</span>
      </el-col>
    </el-row>
    <el-row class="block">
      <el-col :span="6">
        <span class="label">所属企业</span>
        <el-select v-model="companyIdChecked" clearable placeholder="请选择">
          <el-option
            v-for="company in companyList"
            :key="company.id"
            :label="company.name"
            :value="company.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="label">运行状态</span>
        <el-select v-model="runningStateChecked" clearable placeholder="请选择">
          <el-option
            v-for="item in runningStateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="onFilterChange">检索</el-button>
      </el-col>
    </el-row>
    <el-row class="block">
      <el-col :span="4">
        节点详情
      </el-col>
      <el-col :span="20" style="text-align: right">
        <el-button type="primary" @click="toAddNode">添加节点</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="nodeList"
      border
      class="block"
      style="width: 100%; text-align:center">
      <el-table-column
        prop="name"
        align="center"
        label="节点名称">
      </el-table-column>
      <el-table-column
        prop="compnyName"
        align="center"
        label="所属企业">
      </el-table-column>
      <el-table-column
        prop="deployedServer"
        align="center"
        label="挂载主机">
      </el-table-column>
      <el-table-column
        prop="type"
        align="center"
        :formatter="formatNodeType"
        label="节点类型">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        :formatter="formatTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="运行状态">
        <template slot-scope="scope">
          <span :class="{alert: scope.row.status === NodeRunningStateEnum.DO_EVIL}">
            {{formatRunningState(scope.row)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-link @click="handleOperation(scope.row)" type="primary" :underline="false">
            {{formatOperationText(scope.row)}}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="nodeListLength && nodeListLength / pageSize > 1"
      background
      style="width: 100%; text-align: right; margin-top: 20px"
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="pageIndex"
      :total= "nodeListLength"
      @current-change="getNodes">
    </el-pagination>
  </div>
</template>

<script>
  import { NodeRunningStateEnum, NodeTypeEnum } from '../../utils/data/enum'
  import { isNullOrEmpty } from '../../utils/tools'
  import nodeManagementApi from '../../apis/nodeManagementApi'
  import filters from '@/filters'
  const { timeFormat } = filters
  const { getNodes, getCompanyList, changeNodeRunningStatus } = nodeManagementApi

  const runningStateList = [
    {name: '已停止', id: NodeRunningStateEnum.STOPPED},
    {name: '运行中', id: NodeRunningStateEnum.IN_OPERATION},
    {name: '作恶节点', id: NodeRunningStateEnum.DO_EVIL},
    {name: '未启动', id: NodeRunningStateEnum.NOT_START},

  ]

  export default {
    data () {
      return {
        companyList:[],
        companyIdChecked: '',
        runningStateList: runningStateList,
        runningStateChecked: '',
        nodeList: [],
        nodeListLength: 0,
        NodeRunningStateEnum: NodeRunningStateEnum,
        pageIndex: 1,  // 当前页
        pageSize: 10,  // 每页条数
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getCompanyList()
        this.getNodes()
      },
      getCompanyList () {
        getCompanyList().then((res) => {
          this.companyList = res['data'] || []
        }).catch(() => {
          // TODO
        })
      },
      onFilterChange () {
        this.pageIndex = 1
        this.getNodes()
      },
      getNodes () {
          getNodes('', this.companyIdChecked, this.runningStateChecked, this.pageIndex, this.pageSize ).then((res) => {
            let data = res['data'] || {}
            this.nodeList = data.data || []
            this.nodeListLength = data.total
          }).catch(() => {
            // TODO
          })

      },
      formatTime (row,column) {
        var time = row[column.property];
        if(isNullOrEmpty(time)){return ''}
        return timeFormat(time,'YYYY-MM-DD HH:mm:ss')
      },
      formatNodeType (row,column) {
        var typeId = row[column.property];
        if(isNullOrEmpty(typeId)){return ''}
        switch (typeId) {
          case NodeTypeEnum.FULL_NODE:   return '全节点';
          case NodeTypeEnum.CONSENSUS_NODE: return '共识节点';
          case NodeTypeEnum.DATA_NODE:  return '数据节点';
        }
      },
      formatRunningState (item) {
        let status = item.status
        if(isNullOrEmpty(status)){
          return ''
        }
        switch (status) {
          case NodeRunningStateEnum.NOT_START: return '未启动'
          case NodeRunningStateEnum.IN_OPERATION: return '运行中'
          case NodeRunningStateEnum.STOPPED: return '已停止'
          case NodeRunningStateEnum.DO_EVIL: return '作恶节点'
        }
      },
      formatOperationText (item) {
        let status = item.status
        if(isNullOrEmpty(status)){
          return ''
        }
        switch (status) {
          case NodeRunningStateEnum.NOT_START: return '启动';
          case NodeRunningStateEnum.IN_OPERATION: return '停止';
          case NodeRunningStateEnum.STOPPED: return '重新启动'
          case NodeRunningStateEnum.DO_EVIL: return '重启';
        }
      },

      handleOperation (item) {
        let nodeId = item.id, runningStatus = item.status, updateTime = item.updateTime
        this.tipsBeforeChangingNodeStatus(runningStatus, updateTime).then((res) => {
          changeNodeRunningStatus(nodeId, res && res.statusAdjusted).then(() => {
            this.$message({
              message: '恭喜你，操作成功',
              type: 'success'
            });
            this.getNodes()
          }).catch(() => {
            // TODO
          })
        }).catch(() => {
          this.$message('您已取消操作')
        })
      },
      tipsBeforeChangingNodeStatus (runningStatus) {
        const confirmConfig = {tipsTitle: '提示',tips: '',confirmButtonText: '',cancelButtonText: '',statusAdjusted: '',dangerouslyUseHTMLString: false}

        return new Promise((resolve, reject) => {

          if(runningStatus === NodeRunningStateEnum.NOT_START) {
            confirmConfig.tips = '节点启用后将自动加入联盟链，进行数据同步等操作，请务必保证节点安全性，防止数据泄露。'
            confirmConfig.confirmButtonText = '确定启用节点'
            confirmConfig.cancelButtonText = '暂不启用'
            confirmConfig.statusAdjusted = NodeRunningStateEnum.IN_OPERATION
          } else if (runningStatus === NodeRunningStateEnum.IN_OPERATION) {
            confirmConfig.tips = `<div style="text-align:center">
                                    <i class="el-icon-warning tcw_color_alert"style="font-size: 50px"></i>
                                    <p style="text-align:left ; margin: 20px 0 20px">节点运行中，停止节点后该节点无法参与共识、接受数据、进行交易、打包操作，请谨慎选择停止节点运行操作。</p>
                                  </div>`
            confirmConfig.confirmButtonText = '确认停止(危险操作，请务必确认后执行)'
            confirmConfig.cancelButtonText = '暂不停止'
            confirmConfig.statusAdjusted =  NodeRunningStateEnum.STOPPED
            confirmConfig.dangerouslyUseHTMLString = true
            confirmConfig.tipsTitle = ''
          } else if (runningStatus === NodeRunningStateEnum.STOPPED) {
            confirmConfig.tips = '该节点已停用，请确认后重新启用启用加入联盟链，请务必保证节点安全性，防止数据泄露。'
            confirmConfig.confirmButtonText = '确定启用节点'
            confirmConfig.cancelButtonText = '暂不启用'
            confirmConfig.statusAdjusted = NodeRunningStateEnum.IN_OPERATION
          } else if (runningStatus === NodeRunningStateEnum.DO_EVIL) {
            confirmConfig.tips = '该节点已停用，请确认后重新启用启用加入联盟链，请务必保证节点安全性，防止数据泄露。'
            confirmConfig.confirmButtonText = '确定启用节点'
            confirmConfig.cancelButtonText = '暂不启用'
            confirmConfig.statusAdjusted = NodeRunningStateEnum.IN_OPERATION
          }

          this.$confirm(confirmConfig.tips, confirmConfig.tipsTitle, {
            confirmButtonText: confirmConfig.confirmButtonText,
            cancelButtonText: confirmConfig.cancelButtonText,
            dangerouslyUseHTMLString: confirmConfig.dangerouslyUseHTMLString,
          }).then(() => {
            resolve({statusAdjusted: confirmConfig.statusAdjusted})
          }).catch(() => {
            reject()
          });
        })
      },
      toAddNode(){
        this.$router.push('/nodeAddition')
      }
    }
  }
</script>

<style scoped lang="scss">
  #node-management{
    .block{
      margin-top: 30px;
    }
    .label{
      margin-right: 8px;
    }
    .alert{
      color: #ff3916;
    }
  }
</style>
