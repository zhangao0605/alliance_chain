<template>
  <el-form ref="form" :model="form" :rules="rules" class="form">
    <el-form-item prop="account">
      <label for="account">{{$lan('账号')}}<span>({{$lan('电子邮箱')}})</span></label>
      <el-input v-model="form.account" id="account"  class="input"></el-input>
    </el-form-item>
    <el-form-item prop="imgCode" class="input-img-code">
      <label for="imgCode">{{$lan('验证码')}}<span>({{$lan('不区分大小写')}})</span></label>
      <el-input v-model="form.imgCode" id="imgCode" class="input">

      </el-input>
      <el-image
        style="width: 120px; height: 50px;"
        @click="getImgCode"
        class="img-code"
        :src="imgCodeUrl"
        fir="fill"/>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button type="primary" class="btn-next" :loading="btnLoading" @click="next" round>{{$lan('下一步')}}</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  import { ruleOfEmail } from '@/utils/rules'
  import { validEmail } from '../../../utils/validate'
  import userApi from '@/apis/userApi'
  import { getUuid } from '../../../utils/tools'
  const { checkExist, getImgCode } = userApi
  export default {
    name: 'AccountChecking',
    data () {
      return {
        form: {
          account: '',
          imgCode: ''
        },
        rules: {
          account: [
            { required: true, message: this.$lan('请输入您的账号'), trigger: 'blur' },
            { pattern: ruleOfEmail, message: this.$lan('请输入正确的邮箱'), trigger: 'blur' }

          ],
          imgCode: [
            { required: true, message: this.$lan('请输入图形验证码'), trigger: 'blur' }
          ]
        },
        uuid: '',
        imgCodeUrl: '',
        btnLoading: false
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.getImgCode()
      },
      getImgCode () {
        this.uuid = getUuid()
        getImgCode(this.uuid).then((res) => {
          this.imgCodeUrl ='data:image/jpeg;base64,'  + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          console.log(this.imgCodeUrl)
        }).catch((err) => {
          console.log(err)
        })
      },
      next () {
        if (!this.form.account) {
          this.waring('请填写账号')
          return
        }
        if (!validEmail(this.form.account)) {
          this.waring('请输入正确的邮箱')
          return
        }
        if (!this.form.imgCode) {
          this.waring('请填写验证码')
          return
        }
        this.btnLoading = true
        checkExist(this.form.account, this.uuid, this.form.imgCode).then((res) => {
          this.btnLoading = false
          this.$emit('handleNext', this.form.account)
        }).catch((err) => {
          console.log(err)
          this.getImgCode()
          this.btnLoading = false
        })
      },
      waring (text) {
       this.$message({
         message: text,
         type: 'warning'
       })
      }
    }
  }
</script>

<style scoped lang="scss">
  .input-img-code{
    position: relative;
    .img-code{
      position: absolute;
      bottom: 5px;
      right: 0;
    }
  }
</style>
