<template>
  <el-form ref="form" :rules="rules" :model="form" class="form" status-icon>
    <el-form-item prop="password">
      <label for="password">新密码</label>
      <el-input v-model="form.password" :placeholder="$lan('请输入您的新密码')" id="password" show-password autocomplete="off" />
    </el-form-item>
    <el-form-item prop="passwordDuplicate">
      <label for="passwordDuplicate">确认密码</label>
      <el-input v-model="form.passwordDuplicate" id="passwordDuplicate"  :placeholder="$lan('请再次输入密码')" show-password />
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" class="btn-next" round @click="resetPassword">确认重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { validPassword } from '@/utils/validate'
  import userApi from '@/apis/userApi'
  const { resetPassword } = userApi

  export default {
    name: 'PasswordResetting',
    props: {
      email: String,
      emailCode: String
    },
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入您的新密码'))
        }
        if (validPassword(value)) {
          callback()
        } else {
          callback(new Error(`密码长度为${this.MIN_LENGTH_OF_PASSWORD}-${this.MAX_LENGTH_OF_PASSWORD}个字符，必须包含字母、数字、特殊符号其中的两种`))
        }
      }
      var validatePasswordDuplicate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请您再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次密码输入不一致，请重新输入'))
        } else {
          callback()
        }
      }
      return {
        form: {
          password: '',
          passwordDuplicate: ''
        },
        rules: {
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwordDuplicate: [
            { validator: validatePasswordDuplicate, trigger: 'blur' }
          ]
        },
        btnLoading: false
      }
    },
    methods: {
      resetPassword () {
        let password = this.form.password
        let passwordDuplicate = this.form.passwordDuplicate
        if (!password) {
          this.warning('请输入您的新密码')
          return
        }
        if (!validPassword(password)) {
          this.warning(`密码长度为${this.MIN_LENGTH_OF_PASSWORD}-${this.MAX_LENGTH_OF_PASSWORD}个字符，必须包含字母、数字、特殊符号其中的两种`)
          return
        }
        if (!passwordDuplicate) {
          this.warning('请您再次输入密码')
          return
        }
        if ( password !== passwordDuplicate) {
          this.warning('两次密码输入不一致，请重新输入')
          return
        }
        this.btnLoading = true
        resetPassword('1', '', this.form.password, this.email, this.emailCode).then(() => {
          this.btnLoading = false
          this.$emit('handleNext')
          this.$alert('密码重置成功，请前往登录页登录', '提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.$router.replace('/login')
            }
          })
        }).catch(() => {
          this.btnLoading = false
        })

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

</style>
