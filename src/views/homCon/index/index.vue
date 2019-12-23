<template>
  <div id="index">
    <div class="alliance-list" v-show="!showWelcomePage">
    <div class="block" v-if="alliancesValid && alliancesValid.length">
      <div class="tcw_main_title">
        <span>
          请选择您要加入的联盟
        </span>
        <router-link to="allianceAdding">
          <el-button class="add-alliance" type="primary" :underline="false">新建联盟</el-button>
        </router-link>
      </div>
      <div>
        <ul class="alliance-list">
          <li v-for="item in alliancesValid" :key="item.id" class="alliance alliance-approved" @click="allianceSelected = item" :class="{tcw_color_primary: allianceSelected && allianceSelected.id===item.id}">
            {{item.name}}
          </li>
        </ul>
        <el-button class="enter-alliance" :type="allianceSelected ? 'primary' : ''" @click="enterAlliance">进入</el-button>
      </div>
    </div>
    <div class="block" v-if="alliancesApplying && alliancesApplying.length">
      <div class="tcw_main_title">审核中的联盟</div>
      <ul class="alliance-list">
        <li class="alliance alliance-in-review" v-for="item in alliancesApplying">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="block" v-if="alliancesApplying && alliancesApplying.length">
      <router-link to="allianceAdding" v-if="!alliancesValid || !alliancesValid.length">
        <el-button style="width: 200px" type="primary">创建联盟</el-button>
      </router-link>
    </div>
    <div v-if="!alliancesApplying || !alliancesApplying.length" class="add-alliance-init">
      <router-link to="allianceAdding" v-if="!alliancesValid || !alliancesValid.length">
        <el-button style="width: 200px;height: 60px;" type="primary">创建联盟</el-button>
      </router-link>
    </div>
    </div>
    <div class="welcome tcw_color_primary" v-show="showWelcomePage">
       <span>欢迎进入{{allianceSelected && allianceSelected.name}}！</span>
    </div>
  </div>


</template>

<script>
  import allianceManagementApi from '@/apis/allianceManagementApi'
  import { createNamespacedHelpers } from 'vuex'
  import { AllianceReviewStatusEnum } from '../../../utils/data/enum'
  const { getAlliances, enterAlliance } = allianceManagementApi

  const { mapMutations } = createNamespacedHelpers('user')
  export default {

    data () {
      let data1 = []
      let data2 = [{id:1},{id:2},{id:3}]
      let data3 = [{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:7}]
      return {
        alliancesValid: null,
        alliancesApplying: null,
        allianceSelected: null,
        showWelcomePage: false,
        pageLoading: false
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.$loading()
        Promise.all([getAlliances(AllianceReviewStatusEnum.APPROVED), getAlliances(AllianceReviewStatusEnum.NO_OPERATION) ]).then((res) => {
          this.alliancesValid = res[0]['data'] || []
          this.alliancesApplying = res[1]['data'] || []
          this.SET_ACCESSIBLE_ALLIANCE_LIST(this.alliancesValid)
          this.$loading().close()
        }).catch(() => {

        })
      },
      enterAlliance () {
        if(!this.allianceSelected){
          this.$message({
            message: '请选择要进入的联盟',
            type:'warning'
          })
          return;
        }
        enterAlliance(this.allianceSelected.id).then((res) => {
          let data = res['data'] || ''
          this.SET_CURRENT_ALLIANCE_INFO(this.allianceSelected)
          this.SET_IF_ALLIANCE_LEADER(data)
          this.$message({
            message: '加入成功！',
            type: 'success'
          })
          this.showWelcomePage = true
        }).catch(() => {

        })

      },
      ...mapMutations(['SET_ACCESSIBLE_ALLIANCE_LIST','SET_CURRENT_ALLIANCE_INFO', 'SET_IF_ALLIANCE_LEADER'])
    }
  }
</script>

<style scoped lang="scss">
  #index{
    position: relative;
    height: 100%;
    .welcome{
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
    }
    .block{
      position: relative;
      width: 100%;
      padding-right: 20px;
      margin-top: 50px;
    }
    .alliance-list{
      .alliance{
        display: inline-block;
        width: 20%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-radius: 2px;
        border: 1px solid #d7dae2;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        margin-left: 3%;
        margin-top: 20px;
        &.alliance-approved{
          background: #f3f3f3;
        }
        &.alliance-in-review{
          background: #e0e0e0;
        }
      }
    }
    .enter-alliance{
      margin-left: 3%;
      margin-top: 20px;
      width: 20%;
    }
    .add-alliance{
      margin-left: 50px;
    }
    .add-alliance-init{
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
