const state = {
  // 8081路径
  baseURL: "http://contract-ide.thinkey.xyz/node",
  // baseURL: "http://43.247.184.50:8111/node",
  // baseURL: document.location.protocol + window.location.search + "/node",
  // 打开文件路径
  filePath: "",
  // 合约内容
  contractCon: {
    name: "",
    /* 描述 */
    description: "",
    /* 是否保存 */
    is_edit: 0,
    /* 上一级目录 */
    open_url: '',
    /* 打开文件路径 */
    file_path: "",
    /* 部署链位置 */
    deployment_chain: "",
  },
  // 合约升级初始化
  contractUpgrade: "",
  // 权限设置-角色-详情
  roleId: "",
  // 合约列表
  contract_list: '',
  // 合约升级
  upgrade_contract: "",
  //部署合约""
  deploy_contract: '',

};

const mutations = {
  SET_BASEURL(state, data) {
    state.baseURL = data;
  },
  SET_FILE_PATH(state, data) {
    state.filePath = data;
  },
  SET_CONTRACT_CON(state, data) {
    state = Object.assign(state, {
      contractCon: { ...data }
    });
  },
  SET_CONTRACT_UPGRADE(state, data) {
    state.contractUpgrade = data;
  },
  SET_ROLE_ID(state, data) {
    state.roleId = data;
  },
  SET_CONTRACT_LIST(state, data) {
    state.contract_list = data;
  },
  SET_UPGRADE_CONTRACT(state, data) {
    state.upgrade_contract = data;
  },
  SET_DEPLOY_CONTRACT(state, data) {
    state.deploy_contract = data;
  },
};

const actions = {
  setbaseurl({ commit }, data) {
    commit("SET_BASEURL", data);
  },
  setFilePath({ commit }, data) {
    commit("SET_FILE_PATH", data);
  },
  setContractCon({ commit }, data) {
    commit("SET_CONTRACT_CON", data);
  },
  setContractUpgrade({ commit }, data) {
    commit("SET_CONTRACT_UPGRADE", data);
  },
  setroleId({ commit }, data) {
    commit("SET_ROLE_ID", data);
  },
  setConTractList({ commit }, data) {
    commit("SET_CONTRACT_LIST", data);
  },
  setConUpgradeContract({ commit }, data) {
    commit("SET_UPGRADE_CONTRACT", data);
  },
  setConDeployContract({ commit }, data) {
    commit("SET_DEPLOY_CONTRACT", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};