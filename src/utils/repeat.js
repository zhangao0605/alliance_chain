export default {
  install(Vue, opt) {
    Vue.prototype.contract_con = function (type, data) {
      if (type === 0) {
        this.$store.dispatch('utils/setContractCon', data)
      } else if (type === 1) {
        let objs = this.$store.getters.contractCon
        objs.is_edit = 1
        this.$store.dispatch('utils/setContractCon', objs)
      } else if (type === 2) {
        let objs = this.$store.getters.contractCon
        objs.file_path = data
        this.$store.dispatch('utils/setContractCon', objs)
      }
    }
    Vue.prototype.get_contract_con = function () {
      let data = this.$store.getters.contractCon
      return data
    }
    Vue.prototype.get_user_info_phone = function () {
      let data = this.$store.getters.userInfo.phone
      return data
    }
    Vue.prototype.get_base_url = function () {
      let data = this.$store.getters.baseURL
      return data
    }
    Vue.prototype.set_conTract_list = function (data) {
      this.$store.dispatch('utils/setConTractList', data)

    }
    Vue.prototype.get_conTract_list = function () {
      let data = this.$store.getters.contract_list
      return data
    }
    Vue.prototype.upgrade_contract = function (data) {
      this.$store.dispatch('utils/setConUpgradeContract', data)

    }
    Vue.prototype.get_upgrade_contract = function () {
      let data = this.$store.getters.upgrade_contract
      return data
    }
    Vue.prototype.delopy_contract = function (data) {

      this.$store.dispatch('utils/setConDeployContract', data)

    }
    Vue.prototype.get_delopy_contract = function () {
      let data = this.$store.getters.delopy_contract
      return data
    }
  }
}