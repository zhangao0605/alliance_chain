<template>
  <div class="cs_con">
    <div class="cs_con_title">
      <div class="tcw_main_title">合约管理</div>
      <el-button type="primary" @click="to_new_contract()">新建合约</el-button>
    </div>

    <div class="con_table">
      <el-table
        :data="table_data"
        border
        style="width: 100%;margin-bottom: 30px;margin-top: 40px"
        :header-cell-style="this.tableHeaderColor"
      >
        <el-table-column label="合约名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contractName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合约描述" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contractDescription }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属链" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.chainName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center">
          <template slot-scope="scope">
            <span>{{ timestampToTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ is_status(scope.row.status )}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <span
              class="operational_style"
              v-show="scope.row.status==1"
              @click="deployment_contracte(scope.row)"
            >部署</span>
            <span
              class="operational_style operational_style_1"
              @click="to_upgrade_contract(scope.row)"
            >升级</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="currentPageChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total,prev, pager, next"
        :total="totla"
      ></el-pagination>
      <p class="tcw_text mar_top">注：一个合约只能部署在一条区块链上，如果其他链上需要使用类似内容的合约，请重新进行部署，多链间的合约数据暂时无法互通。</p>
    </div>
  </div>
</template>

<script>
import { contractList } from "../../apis/contract";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("utils");
export default {
  name: "contractSetting",
  components: {},
  data() {
    return {
      table_data: [],
      currentPage: 1,
      pagesize: 10,
      totla: 0
    };
  },

  created() {
    this.get_data();
  },
  mounted() {},
  computed: {
    ...mapState(["utils"])
  },
  methods: {
    ...mapMutations(["SET_DEPLOY_CONTRACT", "SET_UPGRADE_CONTRACT"]),
    // 初始化数据
    get_data() {
      let data = {
        page: 1,
        rows: 10
      };
      contractList(data).then(response => {
        this.table_data = response.data.data;
        this.totla = response.data.total;
      });
    },
    // 初始化数据
    to_new_contract() {
      this.$router.push({
        name: "newContract",
        params: {
          type: 0
        }
      });
    },
    // 分页
    currentPageChange(e) {
      this.currentPage = e;
      let data = {
        page: this.currentPage,
        rows: 10
      };
      contractList(data).then(response => {
        this.table_data = response.data.data;
        this.totla = response.data.total;
      });
    },
    is_status(e) {
      let a = "";
      a = "提交待审核";
      if (e === 0) {
      } else if (e === 1) {
        a = "审核通过";
      } else if (e === 2) {
        a = "拒绝";
      } else if (e === 3) {
        a = "已部署 ";
      }
      return a;
    },
    // 部署合约
    deployment_contracte(e) {
      this.SET_DEPLOY_CONTRACT(e);
      this.$router.push({ path: "/deploy" });
    },
    // 升级合约
    to_upgrade_contract(e) {
      let data = {
        name: "",
        description: "",
        is_edit: 0,
        deployment_chain: 1,
        open_url: "",
        file_path: ""
      };
      this.contract_con(0, data);
      this.SET_UPGRADE_CONTRACT(e);
      this.$router.push({ path: "/upgrade" });
    }
  }
};
</script>
<style>
</style>
<style  scoped>
.cs_con_title {
  display: flex;
  justify-content: space-between;
}
.el-pagination {
  position: relative;
  float: right;
  margin-right: 3%;
  margin-bottom: 0px;
}
.mar_top {
  position: relative;
  top: 40px;
}
.operational_style {
  float: left;
  margin-left: 20%;
  /* text-align: center; */
}
.operational_style_1 {
  float: right;
  margin-right: 20%;
}
</style>
