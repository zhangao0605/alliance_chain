<template>
  <div id="login" >
    <img class="logo" src="../../assets/image/logo-white.png"/>
    <el-row style="height: 100%">
       <el-col :span="10" style="position: relative; height:100%">
         <div class="__modal">
           <el-row class="welcome">
             <span class="text">{{$lan('欢迎来到芯际BAAS平台')}}</span>
           </el-row>
           <el-form ref="form" :model="form" class="__form">
             <el-form-item>
               <label for="account">{{$lan('账号')}}</label>
               <el-input v-model="form.account" id="account" :placeholder="$lan('请输入您的账号(邮箱)')" class="height-configurable input"></el-input>
             </el-form-item>
             <el-form-item>
               <label for="password">{{$lan('密码')}}</label>
               <el-input v-model="form.password" id="password" show-password :placeholder="$lan('请输入密码')" class="height-configurable input"></el-input>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" round @click="toLogin" :loading="btnLoading"  class="btn-login">{{$lan('登录')}}</el-button>
             </el-form-item>
           </el-form>
           <el-row class="reset-and-register">
             <el-link @click="forgetPassword"  class="forget-password" :underline="false">{{$lan('忘记密码')}}?</el-link>
             <el-link @click="toRegister"  class="register" :underline="false">{{$lan('注册')}}</el-link>
           </el-row>
         </div>
       </el-col>
    </el-row>
    <HiddenFunction></HiddenFunction>
  </div>
</template>

<script>
  import userApi from '../../apis/userApi'
  import { createNamespacedHelpers } from 'vuex'
  import { validEmail } from '@/utils/validate'
  import HiddenFunction from '../../components/HiddenFunction'
  import { UserTypeEnum, RegistrationInfoReviewResultEnum, RegistrationReviewResultForPageEnum } from '../../utils/data/enum'
  const { mapGetters, mapMutations } = createNamespacedHelpers('user')
  const { login } = userApi
  export default {
    name: 'login',
    components: {
      HiddenFunction
    },
    data () {
      return {
        form: {
          account: '',
          password: '',

        },
        companyConsortiumId: '',
        consortiumName: '',
        btnLoading: false
      }
    },
    created () {
      let that = this
      setTimeout(() => {
        if (that.isLogin) {
          that.$router.replace('/home')
        }
      })

      this.companyConsortiumId = this.$route.query.companyConsortiumId
      this.consortiumName = this.$route.query.consortiumName
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      toLogin () {
        if (!this.form.account) {
          this.warning('请输入账号')
          return
        }
        if (!validEmail(this.form.account)) {
          this.warning('请输入正确的邮箱')
          return
        }
        if (!this.form.password) {
          this.warning('请输入密码')
          return
        }

        this.btnLoading = true
        login(this.form.account, this.form.password).then((res) => {
          let data = res['data'] || {}
          let token = data.token
          // UserTypeEnum.COMPANY 为企业注册，企业用户需要检查注册资质有没有审核
          if (data.type === UserTypeEnum.COMPANY && data.applyStatus === RegistrationInfoReviewResultEnum.NOT_SUBMITTED) {
            this.$router.push({
              path:'/register',
              query:{
                step: 2,
                token: data.token,
                account: this.form.account
              }
            })
          } else if (data.type === UserTypeEnum.COMPANY && data.applyStatus === RegistrationInfoReviewResultEnum.IN_REVIEWING) {
            this.$router.push({
              path:'/registerResult',
              query:{
                result: RegistrationReviewResultForPageEnum.REVIEWING,
              }
            })
          } else if (data.type === UserTypeEnum.COMPANY && data.applyStatus === RegistrationInfoReviewResultEnum.REJECTED) {
            this.$router.push({
              path:'/registerResult',
              query:{
                result: RegistrationReviewResultForPageEnum.FAIL,
                token: token,
                account: data.email
              }
            })
          } else {
            this.SET_TOKEN(token)
            this.SET_USER_INFO(data)
            this.$message({
              message: '登录成功！',
              type: 'success'
            })
            let that = this
            setTimeout(() => {
              let url = this.getUrlAfterLogin()
              that.$router.push(url)
            },1000)
            this.btnLoading = false
          }

        }).catch(() => {
          this.btnLoading = false
        })

      },
      getUrlAfterLogin () {
        if (this.companyConsortiumId) {
          return `/allianceJoin?name=${this.consortiumName}&id=${this.companyConsortiumId}`
        } else {
          return '/home'
        }
      },
      forgetPassword () {
        this.$router.push('/passwordReset')
      },
      toRegister () {
        this.$router.push('/register')
      },
      warning (text) {
        this.$message({
          message: text,
          type: 'warning'
        })
      },
      ...mapMutations(['SET_TOKEN', 'SET_USER_INFO'])
    }
  }
</script>

<style scoped lang="scss">
  #login {
    height: 100%;
    position: relative;
    background: url('../../assets/image/login/bg-login.png') no-repeat;
    background-size:cover;
    .logo{
      position: absolute;
      top: 45%;
      right: 27%;
      transform: translate(50%, -50%);
      width: 25%;
    }
    .__modal {
      width: 80%;
      position: absolute;
      top: 45%;
      left: 60%;
      transform: translate(-50%, -50%);
      .welcome{
        margin-bottom: 40px;
        text-align: left;
        .text{
          color: #fff;
          font-size: 42px;
          font-weight: 700;
        }
      }
      label{
        color: rgb(114,115,140);
        font-size: 18px;
        margin-bottom: 0;
      }
      .__form{
        width: 70%;
      }
      .input{
        /*width: ;*/
        height: 50px;
        font-size: 18px;
        font-weight: bold;
      }
      .btn-login{
        width: 75%;
      }
      /deep/.el-input__inner{
        background-color: rgba(0,0,0,0) ;
        border-radius: 0;
        border: none;
        border-bottom: 2px solid rgb(199,199,199);
        padding: 0;
        color: #fff;
      }
      .btn-login{
        margin-top: 40px;
        height: 56px;
        font-size: 22px;
        font-weight: bold;
      }
      /deep/.el-button.is-round{
        border-radius: 28px;
      }
      /deep/.el-input__inner{
        color: #fff;
      }

    }
    .reset-and-register{
      margin-top: 40px;
      .forget-password{
        color: rgb(114,115,140);
        font-size: 18px
      }
      .register{
        margin-left: 40px;
        color: #fff;
        font-size: 22px
      }
    }

    /deep/input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
      -webkit-text-fill-color: #ededed !important;
      -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
      background-color:transparent;
      background-image: none;
      transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
    }

  }
</style>
