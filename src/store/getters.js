const getters = {
  token: state => state.user.token,
  isLogin: state => !!state.user.token,
  tradeDetailData: state => state.blockManagement.tradeDetailData,
  blockDetailData: state => state.blockManagement.blockDetailData,
  isAllianceLeader: state => state.user.isAllianceLeader,
  baseURL: state => state.utils.baseURL,
  filePath: state => state.utils.filePath,
  contractCon: state => state.utils.contractCon,
  contractUpgrade: state => state.utils.contractUpgrade,
  taskChainId: state => state.blockManagement.taskChainId,
  userInfo: state => state.user.userInfo,
  roleId: state => state.utils.roleId,
  contract_list: state => state.utils.contract_list,
  upgrade_contract: state => state.utils.upgrade_contract,
  deploy_contract: state => state.utils.deploy_contract,
}
export default getters