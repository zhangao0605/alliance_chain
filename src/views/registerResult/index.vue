<template>
  <div>
    <div class="logo"></div>
    <div class="caption tcw_color_primary">审核结果</div>

    <!--资质审核中-->
    <div class="__modal center-row reviewing" v-if="result === RegistrationReviewResultForPageEnum.REVIEWING">
      <el-row>
        <el-col :span="4">
          <i class="el-icon-success"></i>
        </el-col>
        <el-col :span="20">
          <span class="tips">您的申请已提交，我们将尽快进行审核，3-5日内通知您结果，感谢您对芯际的信任。</span>
        </el-col>
      </el-row>
    </div>

    <!--资质审核未通过-->
    <div class="__modal center-row fail" v-if="result === RegistrationReviewResultForPageEnum.FAIL">
      <el-row>
        <el-col :span="4">
          <i class="el-icon-error tcw_color_alert"></i>
        </el-col>
        <el-col :span="20">
          <span class="tips">
            抱歉，您的资质审核未通过，请<span class="operational_style" @click="reSubmitQualification">重新提交资质</span>，如有问题请联系客服
          </span>
        </el-col>
      </el-row>
    </div>

    <!--从邮箱跳转过来的失效页-->
   <div class="__modal center-row fail" v-if="result === RegistrationReviewResultForPageEnum.INVALID">
      <el-row>
        <el-col :span="4">
          <i class="el-icon-error tcw_color_alert"></i>
        </el-col>
        <el-col :span="20">
          <span class="tips">
            抱歉，您进入的注册页面已失效，请<span class="operational_style" @click="toLogin">登录</span>继续进行相关信息的填写
            <br/>
            或者<span class="operational_style" @click="reRegister">重新注册</span>，如有问题请联系客服
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { RegistrationReviewResultForPageEnum } from "../../utils/data/enum";
export default {
  data() {
    return {
      result: RegistrationReviewResultForPageEnum.FAIL,
      RegistrationReviewResultForPageEnum: RegistrationReviewResultForPageEnum,
      token: '',
      account: ''
    };
  },
  beforeMount() {
    let query = this.$route.query
    let result = query.result;
    this.token = query.token;
    this.account = query.account;
    if (result) {
      this.result = result - 0;
    }
  },
  methods: {
    reRegister () {
      this.$router.push({ name: "register"});
    },
    reSubmitQualification () {
      this.$router.push({ name: "register",query: {
          step: 2,
          token: this.token,
          account: this.account,
          reSubmit: 1
        }});
      console.log(location.href)
    },
    toLogin () {
      this.$router.push({ name: "login"});
    }
  }
};
</script>

<style scoped lang="scss">
.caption {
  text-align: center;
  font-size: 30px;
  margin-top: 70px;
}
.__modal {
  width: 700px;
  padding: 110px 70px 130px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  .el-icon-success {
    color: deeppink;
    font-size: 80px;
    position: relative;
    top: -20px;
  }
  .el-icon-error {
    font-size: 80px;
    position: relative;
    top: -20px;
  }
  .tips {
    display: inline-block;
    color: #666;
  }
}
.center-row {
  margin-left: 50%;
  transform: translate(-50%, 0);
}
</style>
