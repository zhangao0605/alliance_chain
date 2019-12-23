<template>
  <div class="navbar">
    <img src="../assets/image/logo-purple.png" alt="芯际后台" style="width: 8%;margin-left: 1.5%">
    <!--&lt;!&ndash;<lang-select class="right-menu-item hover-effect" />&ndash;&gt;-->
    <!--<div class="heaer_item" style="display: inline-block;float: right;right: 50%;position: relative">-->
    <!--<div class="heaer_item_cl" style="display: inline-block;position: relative;right: 50%;cursor: pointer">-->
    <!--<i class="el-icon-document el_document "/>-->
    <!--<span>开发者文档</span>-->
    <!--</div>-->
    <!--<div class="heaer_item_cl" style="display: inline-block;cursor: pointer">-->
    <!--<i class="el-icon-message el_document "/>-->
    <!--<span>站内信</span>-->
    <!--</div>-->
    <!--</div>-->
    <el-dropdown class="avatar-container" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <el-link class="user_name" type="primary" :underline="false">
          {{ userInfo.companyName || '联盟链'}}
        </el-link>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item command="logout">
          <span>注销登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapState } =  createNamespacedHelpers('user')
export default {
  name: "Home",
  data() {
    return {
      user_info: ""
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    toggleSideBar() {
      // this.$store.dispatch('ToggleSideBar')
    },
    handleCommand (command) {
      switch (command) {
        case 'logout': this.logout(); break;
      }
    },
    logout() {
      this.$store.dispatch('user/logOutByApi').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  },
  mounted() {
    this.user_info = "联盟链";
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  width: 100%;
  height: 10%;
  line-height: 50px;
  box-shadow: 0 5px 10px 0 rgba(224, 230 ,242, 0.9);
  position: relative;
  z-index: 10;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    cursor: pointer;
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 2%;
  }

  .el-dropdown-menu {
    background-color: red;
  }
}

.user_name {
  display: inline-block;
  font-size: 16px;
  color: #409eff;
  padding-right: 20px;
  font-weight: bold;
}

.bg_1 {
  /*background: url("../assets/images/logo_1.png") no-repeat;*/
  display: inline-block;
  height: 35px;
  background-size: 85%;
  width: 105px;
  position: relative;
  top: 7px;
  left: 1.7%;
}
</style>
