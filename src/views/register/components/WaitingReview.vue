<template>
  <div class="__modal center-row">
    <el-row>
      <el-col :span="4">
        <i class="el-icon-success"></i>
      </el-col>
      <el-col :span="20">
        <span class="tips">您的申请已提交，我们将尽快进行审核，3-5日内通知您结果，感谢您对芯际的信任。</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'WaitingReview'
  }
</script>

<style scoped lang="scss">
  .__modal{
    width: 700px;
    padding: 110px 70px 130px;
    text-align: left;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .el-icon-success{
      color: deeppink;
      font-size: 80px;
      position: relative;
      top: -20px;
    }
    .tips{
      display: inline-block;
      color: #666;
    }
  }
</style>
