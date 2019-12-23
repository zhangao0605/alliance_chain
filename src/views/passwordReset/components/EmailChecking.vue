<template>
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item >
      <span style="font-size: 20px">
        我们已向您的邮箱发送了验证码，请您输入，验证码有效期为10分钟
      </span>
    </el-form-item>
    <el-form-item prop="emailCode" style="margin-top: 40px">
      <label for="emailCode">邮箱验证码</label>
      <el-input v-model="form.emailCode" id="emailCode" :placeholder="$lan('请输入邮箱验证码')" ></el-input>

    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" round class="btn-next" :loading="btnLoading" @click="next">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import userApi from '@/apis/userApi'
  const { verifyEmail } = userApi
  export default {
    name: 'EmailChecking',
    props:{
      email: String,
    },
    data () {
      return {
        form: {
          emailCode: ''
        },
        rules: {
          emailCode: [
            { required: true, message: this.$lan('请输入验证码'), trigger: 'blur' }
          ]
        },
        btnLoading: false,
        timeout: null
      }
    },
    created () {
      // 15分钟后，用户需要重新修改
      let that = this
      this.timeout = setTimeout(() => {
        that.btnLoading = true;
        that.$alert('验证码已失效，请重新进入修改密码流程', '提示', {
          confirmButtonText: '确定',
          showClose: false,
          callback: () => {
            location.reload()
          }
        });
      }, 600000)
    },
    methods: {
      next () {
        if (!this.form.emailCode) {
          this.$message({
            message: '请输入邮箱验证码'
          })
          return
        }
        this.btnLoading = true
        verifyEmail(this.email, this.form.emailCode).then(() => {
          this.$message({
            message: '验证码验证成功',
            type: 'success'
          })
          this.$emit('handleNext', this.form.emailCode)
          this.btnLoading = false
        }).catch(() => {
          this.btnLoading = false
          // TODO
        })
      }
    },
    destroyed () {
      clearTimeout(
        this.timeout
      )
      this.timeout = null
    }
  }
</script>

<style scoped lang="scss">
  .code{
    position: relative;
    .code-getting-text{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
    }
    .btn-next{
      margin-top: 30px;
    }
  }
</style>
