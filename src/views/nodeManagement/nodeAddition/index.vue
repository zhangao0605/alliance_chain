<template>
  <div id="node-addition">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="__breadcrumb">
      <el-breadcrumb-item :to="{ path: '/nodeManagement' }">节点管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加节点</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tcw_container">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="form">
        <el-form-item label="企业名称">
          <span>{{companyName}}</span>
        </el-form-item>
        <el-form-item label="节点名称" prop="nodeName">
          <el-input v-model="form.nodeName" class="input"></el-input>
        </el-form-item>
        <el-form-item label="挂载主机" prop="deployedServer">
          <el-input v-model="form.deployedServer" class="input"></el-input>
        </el-form-item>
        <el-form-item label="节点类别" prop="nodeType">
          <el-radio-group v-model="form.nodeType">
            <el-radio :label="item.nodeTypeId" :key="item.nodeTypeId" v-for="item in nodeTypeList">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="addNode" :loading="btnLoading" round style="width: 200px">申请添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { NodeTypeEnum } from '../../../utils/data/enum'
  import { ruleOfHost } from '../../../utils/rules'
  import { validHost } from '../../../utils/validate'
  import nodeManagementApi from '../../../apis/nodeManagementApi'

  export default {
    data(){
      const nodeTypeList = [
        {name: '全节点', nodeTypeId: NodeTypeEnum.FULL_NODE},
        {name: '共识节点', nodeTypeId: NodeTypeEnum.CONSENSUS_NODE},
        {name: '数据节点', nodeTypeId: NodeTypeEnum.DATA_NODE},
      ]
      return {
        nodeTypeList:nodeTypeList,
        form: {
          nodeName: '',
          deployedServer: '',
          nodeType: '',
        },
        rules: {
          nodeName: [
            { required: true, message: this.$lan('请填写节点名称'), trigger: 'blur' },
          ],
          deployedServer: [
            { required: true, message: this.$lan('请填写挂载主机'), trigger: 'blur' },
            { pattern: ruleOfHost, message: this.$lan('请输入正确的主机地址，例：192.168.0.1:8080'), trigger: 'blur' }
          ],
          nodeType: [
            { required: true, message: this.$lan('请选择节点类别'), trigger: 'blur' },
          ],
        },
        btnLoading: false
      }
    },
    computed: {
      companyName () {
        return this.$store.getters.userInfo.companyName
      }
    },
    methods: {
      addNode () {
        if(!this.form.nodeName){
          this.warning('请填写节点名称')
          return;
        }
        if(!this.form.deployedServer){
          this.warning('请填写挂载主机')
          return;
        }
        if(!validHost(this.form.deployedServer)){
          this.warning('请输入正确的主机地址')
          return;
        }
        if(!this.form.nodeType){
          this.warning('请选择节点类别')
          return;
        }

        this.btnLoading = true
        // chainId 默认先传1
        nodeManagementApi.addNode(this.form.nodeName, this.form.deployedServer, this.form.nodeType, 1).then(() => {
          this.tipsForAdditionEnd()
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
        })
      },
      clearFill () {
        this.form.nodeName = '';
        this.form.deployedServer = ''
      },
      tipsForAdditionEnd () {
        this.$confirm('您已成功创建节点，请等待审核', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '继续添加',
          cancelButtonText: '返回'
        })
          .then(() => {
            this.clearFill()
          })
          .catch(() => {
            history.back()
          });
      },
      warning (text) {
        this.$message({
          message: text,
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #node-addition{
    height: 100%;
    .__breadcrumb{
      margin-bottom: 30px;
    }
    .form{
      .input{
        width: 400px;
      }
    }
  }

</style>
