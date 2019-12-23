<template>
  <div style="height: 100%; width: 100%">
    <Header class="header"></Header>
    <el-row class="con">
      <el-col class="con-side">
        <slide-bar></slide-bar>
      </el-col>
      <el-col class="router_class">
        <router-view class="router"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import userApi from "../apis/userApi";
const { mapGetters, mapMutations } = createNamespacedHelpers("user");
/*home内容显示*/
import Header from "../components/header";
/*左侧导航栏*/
import SlideBar from "../components/slidebar";
export default {
  name: "home",
  components: { SlideBar, Header },
  data() {
    return {};
  },
  created() {
    // console.log(this.isLogin)
    // if (!this.isLogin) {
    //   this.$router.replace('/login')
    // } else {
    //   userApi.getPermissions().then((res) => {
    //     let data = res['data'] || []
    //     this.SET_PERMISSION_LIST(data)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // }
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    ...mapMutations(["SET_PERMISSION_LIST"])
  }
};
</script>
<style scoped>
.header {
  height: 10%;
}

.router_class::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.router_class::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgb(236, 240, 246);
  background: #c1cce9;
}

.router_class::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgb(236, 240, 246);
  border-radius: 10px;
  background: rgb(236, 240, 246);
}

.con {
  height: 90%;
  position: relative;
  /* z-index: 8; */
  overflow: hidden;
}
.con-side {
  position: absolute;
  top: 0;
  left: 0;
  width: 15%;
  height: 100%;
  box-shadow: 5px 0 10px 0 rgba(224, 230, 242, 0.9);
  background-color: #ecf0f6;
  /* z-index: 10; */
}
.router_class {
  position: absolute;
  top: 0;
  right: 0;
  width: 85%;
  height: 100%;
  /*margin-top: 0.2%;*/
  overflow-y: scroll;
  padding: 30px 3%;
  background-color: rgb(236, 240, 246);
  /* z-index: 9; */
}
</style>
