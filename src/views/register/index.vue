<template>

  <div id="register" :class="{'white-bg': currentStep === 2}">
    <div class="caption">
      账户注册 <span class="tips">(当前只支持企业注册，不支持个人注册)</span>
    </div>

    <el-steps :active="currentStep" align-center class="step center-row">
      <el-step title="创建账户"></el-step>
      <el-step title="设置身份信息"></el-step>
      <el-step title="等待审核"></el-step>
    </el-steps>
    <account-creation v-if="currentStep === 1" @handleNext="next" />
    <information-setting
      v-if="currentStep === 2"
      @handleNext="next"
      @handleBack="handleBack"
      class="center-row"
    />
    <waiting-review v-if="currentStep === 3" @handleNext="next" />
  </div>
</template>

<script>
import WaitingReview from "./components/WaitingReview";
import AccountCreation from "./components/AccountCreation";
import InformationSetting from "./components/InformationSetting";
import { getURLParam } from "@/utils/tools";

export default {
  name: "register",
  components: { AccountCreation, InformationSetting, WaitingReview },
  data() {
    return {
      currentStep: 1
    };
  },
  created() {
    let step = getURLParam("step") - 0;
    if (step && this.currentStep !== step) {
      this.currentStep = step;
    }
  },
  methods: {
    next() {
      if (this.currentStep === 2) {
        this.currentStep++;
      }
    },
    handleBack() {
      if (this.currentStep !== 1) {
        this.currentStep--;
      }
    }
  }
};
</script>

<style scoped lang="scss">
  #register{
    height: 100%;
    background: #eee;
    position: relative;
    overflow: auto;
    &.white-bg{
      background: #fff;
    }
    /deep/.caption{
      color: #333;
      text-align: center;
      font-size: 50px;
      font-weight: 500;
      position: absolute;
      top: 8%;
      left: 10%;
      .tips{
        color: #999;
        font-size: 16px;
        margin-left: 15px;
      }
    }
    .step{
      width: 43%;
      // 为了配合居中，所以分开写
      margin-top: 11%;
      margin-bottom: 2%;
    }
    /deep/.center-row{
      margin-left: 50%;
      transform: translate(-50%,0);
    }
  }
</style>
