<template>
  <div id="account-creation">
    <div class="__modal center-row">
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="账号名" prop="account">
          <el-input v-model="form.account" class="account-input" placeholder="请输入您的电子邮箱作为用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" class="account-input" placeholder="请输入密码" show-word-limit :maxlength="MAX_LENGTH_OF_PASSWORD" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordDuplicate">
          <el-input v-model="form.passwordDuplicate" class="account-input" placeholder="请再次输入密码" show-word-limit :maxlength="MAX_LENGTH_OF_PASSWORD" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-select v-model="form.areaCode">
                  <el-option label="86" value="86"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14" style="margin-left: 4%">
              <el-input v-model="form.phone" placeholder="请输入您的手机号" type="tel" :maxlength="LENGTH_OF_PHONE_NUMBER"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="短信校验码">
          <el-row>
            <el-col :span="5">
              <el-input v-model="form.code" :maxlength="LENGTH_OF_CODE"></el-input>
            </el-col>
            <el-col :span="5" style="margin-left: 4%; text-align: right">
              <el-link :underline="false" type="primary" @click="getCode">{{codeGettingText}}</el-link>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col class="tcw_auxiliary_text tips">注：手机号验证仅作为防止恶意注册的验证使用，不作为账户绑定手机使用</el-col>
      </el-row>
      <el-button type="primary" class="btn-next center-row" :loading="btnLoading" @click="createAccount">下一步</el-button>
    </div>
    <email-sent-tips :dialogVisible="showEmailSentTips" :email="form.account"/>
  </div>
</template>

<script>
  import { ruleOfEmail, ruleOfPhoneNumber } from '@/utils/rules'
  import { validPassword, validPhoneNumber } from '@/utils/validate'
  import EmailSentTips from './EmailSentTips'
  import userApi from '@/apis/userApi'

  const { getPhoneCode, register } = userApi
  const totalCountdownTime = 60 // 单位为s

  export default {
    name: 'AccountCreation',
    components: { EmailSentTips },
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
          account: '', // 账号
          password: '',
          passwordDuplicate: '',
          areaCode: '86', // 区号
          phone: '',
          code: ''
        },
        rules: {
          account: [
            { required: true, message: this.$lan('账号不能为空'), trigger: 'blur' },
            { pattern: ruleOfEmail, message: this.$lan('请输入您的电子邮箱作为用户名'), trigger: 'blur' }
          ],
          password : [
            { required: true, message: this.$lan('请输入您的新密码'), trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwordDuplicate: [
            { required: true, message: this.$lan('请您再次输入密码'), trigger: 'blur' },
            { validator: validatePasswordDuplicate, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: this.$lan('请输入您的手机号码'), trigger: 'blur' },
            { pattern: ruleOfPhoneNumber, message: this.$lan('请输入正确的手机号'), trigger: 'blur' }
          ],
          code: ''
        },
        countdownTime: totalCountdownTime,
        codeGettingText: '获取验证码',
        btnLoading: false,
        interval: null,
        showEmailSentTips:false,
        lockGetCode: false
      }
    },
    methods: {
      // 获取验证码
      getCode () {
        if (!validPhoneNumber(this.form.phone)) {
          this.warning('请输入正确手机号')
          return
        }
        if (!this.lockGetCode) {
          this.lockGetCode = true
          getPhoneCode(this.form.phone).then(() => {
            this.changeCodeGettingText()
          }).catch(() => {
            this.lockGetCode = false
          })
        }
      },
      changeCodeGettingText () {
        let that = this
        this.interval = setInterval(() => {
          if (that.countdownTime > 1) {
            that.countdownTime--
            that.codeGettingText = `${that.countdownTime}s后重新获取`
          } else {
            that.codeGettingText = '获取验证码'
            // 倒计时结束的时候解锁
            that.lockGetCode = false
            that.countdownTime = totalCountdownTime
            clearInterval(that.interval)
            that.interval = null
          }
        }, 1000)
      },
      createAccount () {
        let {account, password, passwordDuplicate, areaCode, phone, code  } = this.form
        if (!account) {
          this.warning('请输入账号')
          return
        }
        if (!ruleOfEmail.test(account)) {
          this.warning('请输入您的电子邮箱作为用户名')
          return
        }
        if (!password) {
          this.warning('请输入密码')
          return
        }
        if (!validPassword(password)) {
          this.warning(`密码长度为${this.MIN_LENGTH_OF_PASSWORD}-${this.MAX_LENGTH_OF_PASSWORD}个字符，必须包含字母、数字、特殊符号其中的两种`)
          return
        }
        if (!passwordDuplicate ) {
          this.warning('请再次输入密码')
          return
        }
        if (password !== passwordDuplicate ) {
          this.warning('两次密码输入不一致，请重新输入')
          return
        }
        if (!validPhoneNumber(phone)) {
          this.warning('请输入正确手机号')
          return
        }
        if (!code) {
          this.warning('请输入短信校验码')
          return
        }
        this.btnLoading = true
        // 以用户email为账号
        register(account, password, phone, code).then((res) => {
          this.btnLoading = false
          this.showEmailSentTips = true
          this.$emit('handleNext')
        }).catch((err) => {
          this.btnLoading = false
          this.$message({
            message: err.message,
            type: 'error',
            duration: 2 * 1000
          })
        })
      },
      beforeDestroy () {
        clearInterval(this.interval)
        this.interval = null
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
  .__modal {
    width: 700px;
    padding: 50px 70px;
    text-align: left;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .account-input{
      width: 400px;
    }
    .tips{
      text-align: center;
    }
    .btn-next{
      width: 80%;
      margin-top: 30px;
    }
    .forget-password{
      margin-bottom: 10px;
    }
  }

</style>

