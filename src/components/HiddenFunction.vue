<template>
  <div id="hidden-function">
    <div class="click-area" @click="toShowFunctionList"></div>
    <div class="function-list">
      <el-dialog
        title="请选择"
        :visible.sync="showFunctionList"
        :showClose="false"
        width="30%">
        <el-button type="primary" @click="toChangeBaseUrl">更改BaseUrl</el-button>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showFunctionList = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { ruleOfHost2 } from '../utils/rules'
  export default {
    name: 'HiddenFunction',
    data () {
      return {
        clickNumber: 0,
        showFunctionList: false
      }
    },
    methods: {
      toShowFunctionList () {
        this.clickNumber++
        if (this.clickNumber >= 8) {
          this.showFunctionList = true
        }
        let that = this
        setTimeout(() => {
          that.clickNumber = 0
        }, 2000)

      },
      closeFunctionList () {
        this.clickNumber = 0
        this.showFunctionList = false
      },
      toChangeBaseUrl () {
        this.closeFunctionList()
        this.$prompt('请输入BaseUrl地址,例：http://192.168.1.108:9000', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: ruleOfHost2,
          inputErrorMessage: '地址格式不正确'
        }).then(({ value }) => {
          this.$storage.temp('session', 'baseUrl', value)
          this.$message({
            type: 'warning',
            message: '注意：BaseUrl已更改为: ' + value
          });
          setTimeout(() => {
            location.reload()
          },500)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  #hidden-function{
    .click-area{
      position: fixed;
      bottom: 0;
      right: 0;
      width: 50px;
      height: 50px;
      z-index: 9999;
    }
  }
</style>
