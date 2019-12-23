<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="45%">
    <div class="content">
      <el-row>
        <img src="../../../assets/image/icon-email.png" alt="" style="width:40%">
      </el-row>
      <el-row style="text-align: left; margin-top: 50px">
        验证邮件已发送到邮箱<span class="email">{{email}}</span>
      </el-row>
      <el-row style="text-align: left">
        请在24小时内点击邮件中的链接继续注册。
      </el-row>
      <div class="dialog-footer">
        <el-link type="primary" :underline="false" style="font-size: 16px" @click="reSendEmail">{{sendCode.tips}}</el-link>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import userApi from '../../../apis/userApi'
  import SendCode from '../../../utils/class/SendCode'
  export default {
    name: 'EmailSentTips',
    props:['dialogVisible', 'email'],
    data() {
      return {
        emailSendingTips: '',
        sendCode: new SendCode('没有收到邮件?', 'xxs后可以再次发送邮件', 60)
      };
    },
    methods: {
      reSendEmail () {
        if (this.sendCode.btnCanBeClicked) {
          this.sendCode.changeBtnStatus(false)
          userApi.reSendEmail(this.email).then(() => {
            this.$message({
              message:'邮件已发送，请注意查收',
              type: 'success'
            })
            this.sendCode.changeTips()
          }).catch(() => {
            // TODO
          })
        }
      }
    },
    beforeDestroy () {
      this.sendCode.clearInterval()
    }
  }
</script>

<style scoped lang="scss">
  .el-icon-message{
    font-size: 35px;
    color: #2177a2;
  }
  .tips{
    font-size: 16px;
  }

  .content{
    text-align: center;
    padding: 0 80px;
    font-size: 24px;
    color: #666;
    .email{
      color: #333;
    }
    .dialog-footer{
      margin: 10px 0 40px 10px;
    }
  }


</style>
