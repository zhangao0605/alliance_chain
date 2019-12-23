<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo kk"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    menu-trigger="click"
    text-color="rgb(95, 102, 143)"
    mode="vertical"
  >
    <!-- <el-menu-item index="0">
      <i class="iconfont el-icon-shouye"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>联盟链管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">链基本信息</el-menu-item>
        <el-menu-item index="1-2">区块信息</el-menu-item>
        <el-menu-item index="1-3">交易信息</el-menu-item>
        <el-menu-item index="1-4">节点管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-s-grid"></i>
      <span slot="title">联盟管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>工单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">查看工单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">成员管理</el-menu-item>
        <el-menu-item index="3-2">权限设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="5">
      <i class="el-icon-s-grid"></i>
      <span slot="title">账户管理</span>
    </el-menu-item>
    <el-menu-item index="6-1">
      <i class="el-icon-s-grid"></i>
      <span slot="title">联盟消息中心</span>
    </el-menu-item>
    <el-menu-item index="6-2">
      <i class="el-icon-s-grid"></i>
      <span slot="title">系统消息中心</span>
    </el-menu-item>
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>资质审核</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="7-1">全部</el-menu-item>
        <el-menu-item index="7-2">待审核</el-menu-item>
        <el-menu-item index="7-3">已通过</el-menu-item>
        <el-menu-item index="7-4">已驳回</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="8">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>联盟审核</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="8-1">全部</el-menu-item>
        <el-menu-item index="8-2">待审核</el-menu-item>
        <el-menu-item index="8-3">已通过</el-menu-item>
        <el-menu-item index="8-4">已驳回</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="11">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>合约管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="11-1">新建合约</el-menu-item>
        <el-menu-item index="11-2">升级合约</el-menu-item>
        <el-menu-item index="11-3">部署合约</el-menu-item>
        <el-menu-item index="11-4">合约设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>-->
    <div v-for="(item,index) in navmenu" :key="index">
      <el-submenu :index="item.parent && item.parent.name" v-if="item.child.length!=0">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.parent.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            class="menu-second"
            v-for="(item_1,index_1) in item.child"
            :key="index_1"
            :index="item_1.path"
            @click="to_path(item_1.path)"
          >{{item_1.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <div @click="to_path(item.parent.path)" v-else>
        <el-menu-item :index="item.parent && item.parent.path">
          <i class="el-icon-menu"></i>
          <span>{{item.parent.name}}</span>
        </el-menu-item>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { ReviewStatusEnum } from "../utils/data/enum";
import { createNamespacedHelpers } from "vuex";
import { byUser } from "../apis/contract";

const { mapState } = createNamespacedHelpers("user");

export default {
  name: "Slidebar",
  data() {
    let navmenuDefault = [
      {
        child: [],
        parent: {
          description: "首页",
          icon: "",
          id: 48,
          name: "首页",
          parentId: 0,
          path: "/home",
          permission: "nav:main",
          sequence: "a",
          type: 1
        }
      },
      {
        child: [],
        parent: {
          description: "系统消息中心",
          icon: "",
          id: 24,
          name: "系统消息中心",
          parentId: 0,
          path: "/systemMessageCenter",
          permission: "nav:system:message",
          sequence: "h",
          type: 1
        }
      }
    ];
    return {
      navmenu: navmenuDefault
    };
  },
  watch: {
    currentAllianceInfo() {
      this.get_navmenu();
    }
  },
  created() {
    this.get_navmenu();
  },
  computed: {
    // resturantName() {
    //   return this.$store.getters.resturantName
    // }
    ...mapState(["currentAllianceInfo", "accessibleAllianceList"]),
    defaultActive() {
      return this.$route.path;
    }
  },
  methods: {
    get_navmenu() {
      if (!this.accessibleAllianceList) {
         let that = this
         setTimeout(() => {
         that.get_navmenu()
         },100)
         return;
      }
      byUser().then(response => {
        if ( this.currentAllianceInfo ) {
          this.navmenu = this.permission_sort_navmenu(response.data);
        } else if(this.accessibleAllianceList && this.accessibleAllianceList.length) {
          this.navmenu = this.permission_sort_navmenu(response.data,
            [
              'nav:main',                    // 首页
              'nav:system:message',          // 系统消息
              'nav:thinkey',                 // 芯际后台
              'nav:thinkey:company:apply',   // 资质审核
              'nav:thinkey:consortium:apply',// 联盟审核
              'nav:auth',                    // 权限管理
              'nav:auth:member',             // 成员管理
              'nav:auth:setting',            // 权限设置
            ])
        } else {
          this.navmenu = this.permission_sort_navmenu(response.data,
            [
              'nav:main',                    // 首页
              'nav:system:message',          // 系统消息
              'nav:thinkey',                 // 芯际后台
              'nav:thinkey:company:apply',   // 资质审核
              'nav:thinkey:consortium:apply',// 联盟审核
              'nav:auth',                    // 权限管理
              'nav:auth:setting',            // 权限设置
            ])
        }
        console.log(this.navmenu);
        // console.log(this.navmenu[0]);
        // console.log(this.navmenu[6]);
      });
    },

    to_string(e) {
      return e.toString();
    },
    // to_path(e) {
    //   console.log(e);
    // },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      // console.log("11");
      // console.log(key, keyPath);
    },
    to_path(e) {
      if (e === "/newContract") {
        let data = {
          name: "",
          description: "",
          is_edit: 0,
          open_url: "",
          deployment_chain: "1",
          file_path: ""
        };
        this.contract_con(0, data);
        this.$router.push({
          name: "newContract",
          params: {
            type: 0
          }
        });
      } else if (e === "/upgrade") {
        this.$store.dispatch("utils/setContractUpgrade", "-1").then(() => {
          this.$router.push({ path: "/upgrade" });
        });
      } else {
        this.$router.push({ path: e });
      }
    },
    modifyAName() {
      // console.log(this.$store.state.app.resturantName)
      // this.$store.dispatch('app/modifyAName', this.selectValue)
      // console.log(this.$store.state.app.resturantName)
    }
  }
};
</script>
<style lang="scss" scoped>
.el-menu {
  text-align: left;
  /*min-width: 210px !important;*/
  width: 100%;
  /*background-color: #304156;*/
  height: 100%;
  overflow: auto;
  border: none;
  padding-top: 20px;
}
.el-menu::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.el-menu::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #ffffff;
  background: #dbe2f1;
}

.el-menu::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px #ffffff;
  border-radius: 10px;
  background: #ffffff;
}
/deep/.el-menu-item {
  padding-left: 20% !important;
}
/deep/.el-submenu__title {
  padding-left: 20% !important;
}
.menu-second {
  padding-left: 31% !important;
}
.slid_select {
  width: 82%;
  /*background-color: red*/
  margin-left: 9%;
}
.kk {
  width: 96%;
  box-shadow: 5px 0 10px 0 rgba(224, 230, 242, 0.9);
}
</style>
