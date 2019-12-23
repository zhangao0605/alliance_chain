<template>
  <div id="passwordReset">
    <div class="caption">重置密码</div>
    <div class="__modal">
      <el-steps :active="currentStep" align-center class="step">
        <el-step title="账号检测"></el-step>
        <el-step title="邮箱验证"></el-step>
        <el-step title="设置新密码"></el-step>
      </el-steps>
      <account-checking v-if="currentStep === 1" @handleNext="next" />
      <email-checking v-if="currentStep === 2" :email="account" @handleNext="next" />
      <password-resetting
        v-if="currentStep === 3"
        :email="account"
        :emailCode="emailCode"
        @handleNext="next"
      />
    </div>
  </div>
</template>

<script>
import AccountChecking from "./components/AccountChecking";
import EmailChecking from "./components/EmailChecking";
import PasswordResetting from "./components/PasswordResetting";

export default {
  components: { AccountChecking, EmailChecking, PasswordResetting },
  data() {
    return {
      currentStep: 1,
      account: "",
      emailCode: ""
    };
  },
  methods: {
    next(data) {
      if (this.currentStep === 1) {
        this.account = data;
      } else if (this.currentStep === 2) {
        this.emailCode = data;
      }
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    },
    complete() {}
  },
  complete() {}
};
</script>

<style scoped lang="scss">
#passwordReset {
  height: 100%;
  background: #fff;
  position: relative;
  .caption {
    position: absolute;
    top: 8%;
    left: 10%;
    color: rgb(38, 38, 38);
    font-size: 50px;
    font-weight: 500;
  }
  .__modal {
    width: 40%;
    height: 30%;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: left;
    .step {
      margin: 50px 0 50px;
    }
    /deep/label {
      font-size: 18px;
      line-height: 50px;
      color: rgb(140, 142, 166);
      margin-bottom: 0;
      > span {
        font-size: 14px;
        margin-left: 8px;
      }
    }
    /deep/.btn-next {
      width: 60%;
      height: 56px;
      margin-top: 40px;
    }
    /deep/.el-button.is-round {
      border-radius: 28px;
    }
    /deep/.img-code {
      cursor: pointer;
      height: 50px;
    }
    /deep/.el-input__inner {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid rgb(175, 175, 175);
      padding-left: 0;
      font-size: 18px;
    }
    .forget-password {
      margin-bottom: 10px;
    }
  }
}
</style>
