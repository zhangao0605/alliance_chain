import { getToken, setToken, removeToken } from '../../utils/token'
import userApi from '../../apis/userApi'
import storage from '../../utils/storage'

const state = {
  // 用户登录状态唯一标识
  token: getToken(),

  account: getAccount(), // 账号

  // 当前用户的联盟信息
  currentAllianceInfo: getCurrentAllianceInfo(),

  // 用户在当前盟是不是盟主，在首页选择联盟时获得，1是盟主，0不是盟主
  isAllianceLeader: null,

  // 可以进入的联盟列表，包括自己创建的和被邀请的
  accessibleAllianceList: null,

  // 用户信息
  userInfo: {},

  // 权限列表
  permissionList: [],

  // 最后登录时间
  loginLastTime: sessionStorage.getItem('loginLastTime') - 0
}

const getters = {
  isLogin(state) {
    return !!state.token
  }
}

const mutations = {
  // 设置token
  SET_TOKEN(state, token) {
    setToken(token)
    state.token = token
  },
  // 移除token
  REMOVE_TOKEN(state) {
    removeToken()
    state.token = null
  },
  // 设置账户
  SET_ACCOUNT(state, account) {
    saveAccount(account)
    state.account = account
  },
  // 移除账户
  REMOVE_ACCOUNT(state) {
    saveAccount('')
    state.account = null
  },
  // 设置当前联盟信息
  SET_CURRENT_ALLIANCE_INFO(state, allianceInfo) {
    saveCurrentAllianceInfo(allianceInfo)
    state.currentAllianceInfo = allianceInfo
  },
  // 移除当前联盟信息
  REMOVE_CURRENT_ALLIANCE_INFO(state) {
    saveCurrentAllianceInfo('')
    state.currentAllianceInfo = null
  },
  // 设置可以进入的联盟列表
  SET_ACCESSIBLE_ALLIANCE_LIST (state, accessibleAllianceList) {
    state.accessibleAllianceList = accessibleAllianceList || []
  },
  // 删除可以进入的联盟列表
  REMOVE_ACCESSIBLE_ALLIANCE_LIST (state) {
    state.accessibleAllianceList = null
  },
  // 设置用户在当前萌是不是盟主
  SET_IF_ALLIANCE_LEADER(state, status) {
    console.log(status)
    state.isAllianceLeader = status
  },
  // 删除是不是盟主的信息
  REMOVE_IF_ALLIANCE_LEADER(state) {
    state.isAllianceLeader = null
  },
  // 设置用户信息
  SET_USER_INFO(state, info) {
    state.userInfo = info
  },
  // 删除用户相关信息
  REMOVE_USER_INFO(state) {
    state.userInfo = null
  },
  // 设置权限列表
  SET_PERMISSION_LIST(state, list) {
    state.permissionList = list
  },
  // 删除权限列表
  REMOVE_PERMISSION_LIST(state) {
    state.permissionList = null
  }
}

const actions = {
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      let protocol = location.protocol
      let host = location.host
      location.href = protocol + '//' + host + '/#/login'
      commit('REMOVE_TOKEN')
      commit('REMOVE_ACCOUNT')
      commit('REMOVE_CURRENT_ALLIANCE_INFO')
      commit('REMOVE_IF_ALLIANCE_LEADER')
      commit('REMOVE_ACCESSIBLE_ALLIANCE_LIST')
      resolve()
    })
  },
  logOutByApi({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // 直接调一下接口，不用管后端的返回
      userApi.logout().then(() => {
        //TODO
      }).catch(error => {
        //TODO
      })
      dispatch('logout')
      resolve()
    })
  },
}

function saveAccount(account) {
  sessionStorage.setItem('account', account)
}


function getAccount() {
  return sessionStorage.getItem('account') || ''
}


function saveCurrentAllianceInfo(allianceInfo) {
  storage.temp('local', 'currentAllianceInfo', allianceInfo)
}

function getCurrentAllianceInfo() {
  return storage.temp('local', 'currentAllianceInfo')
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
